const dotenv = require('dotenv');
const algosdk = require('algosdk');

dotenv.config();

const algodToken = '';
//const algodServer = 'http://localhost:4001'
const algodServer = 'https://testnet-api.algonode.cloud'; // Algorand Sandbox node URL
const algodPort = 443;

const algodClient = new algosdk.Algodv2(algodToken, algodServer);

const senderMnemonic = process.env.SENDER_MNEMONIC;
const senderAccount = algosdk.mnemonicToSecretKey(senderMnemonic);

const contractAddress = '1001';

/*document.addEventListener('DOMContentLoaded', () => {
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

*/



