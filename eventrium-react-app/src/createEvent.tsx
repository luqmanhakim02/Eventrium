import React, { useEffect, useState } from 'react';
import algosdk from 'algosdk';
import fs from 'fs';
import { useWalletAddress } from './WalletAddressContext';

const algodToken = 'your-algod-token';
const algodServer = 'your-algod-server';

const CreateEvent: React.FC = () => {
  const { walletAddress } = useWalletAddress();
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    async function createEvent() {
      const client = new algosdk.Algodv2(algodToken, algodServer);

      try {
        const params: algosdk.SuggestedParams = await client.getTransactionParams().do();

        // Read the TEAL program from a file
        const tealProgramFilePath = 'path/to/your-teal-program.teal';
        const tealProgramString = fs.readFileSync(tealProgramFilePath, 'utf8');

        // Convert the TEAL program from a string to a Uint8Array
        const tealProgramUint8 = new Uint8Array(Buffer.from(tealProgramString));

        // Define the event details (name, date, price, description)
        const eventDetails = {
          name: 'Event Name',
          date: 'Event Date',
          price: 100, // Event Price in microAlgos
          description: 'Event Description',
        };

        // Convert the event details to an array of numbers
        const eventDetailsArray = Array.from(algosdk.encodeObj(eventDetails));

        // Create the transaction
        const txn = algosdk.makeApplicationNoOpTxn(
          walletAddress || '', // Use wallet address if available
          params,
          tealProgramUint8 as any,
          undefined,
          undefined,
          eventDetailsArray
        );

        // Sign the transaction with the user's wallet (Perawallet, etc.)
        const secretKey = walletAddress ? algosdk.generateAccount() : algosdk.mnemonicToSecretKey('your-wallet-mnemonic');
        const signedTxn = algosdk.signTransaction(txn, secretKey.sk);

        // Submit the transaction to the Algorand network
        const response = await client.sendRawTransaction(signedTxn.blob).do();

        if (response.txId) {
          const txId = response.txId;
          console.log(`Transaction ID: ${txId}`);
          console.log('Event cost deducted successfully.');
          setTransactionId(txId);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    createEvent();
  }, [walletAddress]);

  return (
    <div>
      {transactionId ? (
        <p>Transaction ID: {transactionId}</p>
      ) : (
        <p>Creating Transaction...</p>
      )}
    </div>
  );
};

export default CreateEvent;
