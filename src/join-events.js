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