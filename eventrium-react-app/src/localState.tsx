// Import the Algorand JavaScript SDK
import algosdk from 'algosdk';

// Create an Algod client
const algodServer = 'https://testnet-api.algonode.cloud'; // Replace with your Algorand node
const algodToken = ''; // Replace with your Algorand node token

// Replace these with your contract and transaction details
const appId = 434856235; // Replace with your application ID

export async function getLocalState(eventID: string) {
  try {
    // Replace this with the actual transaction ID for your create/join event transaction
    const txId = 'KEQ7YQMFPVPLQDBRMQMOTJC7CLPPVTGZPCZJ6J2XOQQTEHVZVBFQ';

    // Get the transaction note
    const client = new algosdk.Algodv2(algodToken, algodServer, 443);
    const txInfo = await client.pendingTransactionInformation(txId).do();

    // Check if the transaction has application args
    if (!txInfo.txn.txn.applicationArgs || txInfo.txn.txn.applicationArgs.length === 0) {
      console.error('Transaction application args are empty.');
      return null; // Return null or handle the error as needed
    }

    // Decode the base64-encoded application args
    const applicationArgs = txInfo.txn.txn.applicationArgs.map((arg: string) => Buffer.from(arg, 'base64').toString('utf8'));

    // Check if the note contains the application ID and the type of transaction (create or join)
    if (applicationArgs.length === 2 && applicationArgs[0] === appId.toString()) {
      const eventType = parseInt(applicationArgs[1]);

      if (eventType === 0) {
        // Event creation
        // Retrieve the event details from the global state
        const localState = await client.accountInformation(txInfo.txn.txn.sender).do();
        const appLocalState = localState['apps-local-state'][appId];

        if (appLocalState && appLocalState['key-value']) {
          // Access and return the stored data based on your contract's localState structure
          const eventDetails = appLocalState['key-value'][eventID];
          return eventDetails;
        }
      } else if (eventType === 1) {
        // Event joining
        // Retrieve the event details from the global state
        const localState = await client.accountInformation(txInfo.txn.txn.sender).do();
        const appLocalState = localState['apps-local-state'][appId];

        if (appLocalState && appLocalState['key-value']) {
          // Access and return the stored data based on your contract's localState structure
          const eventDetails = appLocalState['key-value'][eventID];
          return eventDetails;
        }
      }
    } else {
      console.log('Invalid application args format.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
