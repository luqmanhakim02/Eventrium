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