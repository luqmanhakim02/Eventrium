const dotenv = require('dotenv');
const algosdk = require('algosdk');

dotenv.config();

const algodToken = '';
const algodServer = 'http://localhost:4001'
//const algodServer = 'https://testnet-api.algonode.cloud'; // Algorand Sandbox node URL
//const algodPort = 443;

const algodClient = new algosdk.Algodv2(algodToken, algodServer);

const senderMnemonic = process.env.SENDER_MNEMONIC;
const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

const contractAddress = 'your-actual-smart-contract-address';

document.addEventListener('DOMContentLoaded', () => {
    const createEventForm = document.getElementById('createEventForm');
    const joinEventForm = document.getElementById('joinEventForm');

    createEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventPrice = document.getElementById('eventPrice').value;
        
        // Call a backend API to create the event and smart contract interaction
        const response = await createEvent(eventName, eventDate, eventPrice);
        if (response.success) {
            alert('Event created successfully.');
        } else {
            alert('Error creating event: ' + response.message);
        }
    });

    joinEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const eventId = document.getElementById('eventId').value;

        // Call a backend API to join the event and make a payment
        const response = await joinEvent(eventId);
        if (response.success) {
            alert('You have joined the event.');
        } else {
            alert('Error joining event: ' + response.message);
        }
    });
});

async function createEvent(eventName, eventDate, eventPrice) {
    // Implement backend logic to create the event and deploy a smart contract
    // Return an object with success status and a message

    try {
        const params = await algodClient.getTransactionParams().do();

        // Construct the call to the smart contract's 'handle_create' function
        const callTxn = algosdk.makeApplicationCallTxn(
            senderAccount.addr,
            params,
            contractAddress,
            [],
            [],
            'create', // Use a custom string to indicate 'create' operation
            1000000, // Amount in microAlgos (0.001 ALGO)
        );

        // Sign the transaction
        const signedCallTxn = algosdk.signTransaction(callTxn, senderAccount.sk);

        // Submit the transaction
        const callTxId = await algodClient.sendRawTransaction(signedCallTxn.blob).do();

        console.log(`Event creation transaction ID: ${callTxId}`);
        return callTxId;
    } catch (error) {
        console.error(`Error creating event: ${error}`);
    }

    return { success: true, message: 'Event created successfully' };
}

async function joinEvent(eventId) {
    // Implement backend logic to join the event and make a payment
    // Return an object with success status and a message

    try {
        const params = await algodClient.getTransactionParams().do();

        // Read event price from the smart contract's local state
        const localState = await algodClient.accountInformation(contractAddress).do();
        const eventPrice = localState['apps-local-state'][0]['key-value']['event_price'].uint;

        // Construct the call to the smart contract's 'handle_call' function
        const callTxn = algosdk.makeApplicationCallTxn(
            senderAccount.addr,
            params,
            contractAddress,
            [],
            [],
            'join', // Use a custom string to indicate 'join' operation
            eventId.toString(), // Event ID
            500000, // Amount in microAlgos (0.0005 ALGO)
        );

        // Check if the payment amount is sufficient based on event price
        if (params['amount'] >= eventPrice) {
            // Sign the transaction
            const signedCallTxn = algosdk.signTransaction(callTxn, senderAccount.sk);

            // Submit the transaction
            const callTxId = await algodClient.sendRawTransaction(signedCallTxn.blob).do();

            console.log(`Join event transaction ID: ${callTxId}`);
            return callTxId;
        } else {
            console.error('Payment amount is insufficient for joining the event.');
            return { success: false, message: 'Payment amount is insufficient.' };
        }
    } catch (error) {
        console.error(`Error joining event: ${error}`);
        return { success: false, message: 'Error joining event.' };
    }

    return { success: true, message: 'Payment successful' };
}
