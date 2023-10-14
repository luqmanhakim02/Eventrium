import React, { useState } from 'react';
import algosdk from 'algosdk';
import { Buffer } from 'buffer';
import { useWalletAddress } from './WalletAddressContext';
import { usePerawalletConnect } from './PerawalletConnectContext';


const algodToken = 'your-algod-token';
const algodServer = 'https://testnet-api.algonode.cloud';

const CreateEvent: React.FC = () => {
  const walletAddress = useWalletAddress();
  const peraWalletConnect = usePerawalletConnect();

  const [transactionId, setTransactionId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    event_price: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!walletAddress) {
      console.error('Wallet address is not available. Please connect to your wallet.');
      return;
    }

    try {
      const client = new algosdk.Algodv2(algodToken, algodServer);
      const params: algosdk.SuggestedParams = await client.getTransactionParams().do();

      // Load the Teal program content from the imported file
      const tealProgramFilePath = '/create-event.teal'; // Replace with the correct file path
      const tealProgramString = await import(tealProgramFilePath).then((module) => module.default);
      const tealProgramUint8 = new Uint8Array(Buffer.from(tealProgramString));

      // Convert eventDetails to the required format
      const eventDetails = {
        name: formData.event_name,
        date: formData.event_date,
        price: parseFloat(formData.event_price), // Event Price in microAlgos
        description: formData.description,
      };

      const eventDetailsArray = Array.from(algosdk.encodeObj(eventDetails));

      const txn = algosdk.makeApplicationNoOpTxn(
        walletAddress,
        params,
        tealProgramUint8 as any,
        undefined,
        undefined,
        eventDetailsArray
      );

      try {
        const signedTxn = await peraWalletConnect.signTransaction([[{ txn }]]);
        const response = await client.sendRawTransaction(signedTxn[0]).do();

        if (response.txId) {
          const txId = response.txId;
          console.log(`Transaction ID: ${txId}`);
          console.log('Event created successfully.');
          setTransactionId(txId);
        }
      } catch (error) {
        console.error('Error signing the transaction:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_name">Event Name:</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="event_date">Event Date:</label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="event_price">Event Price (in ALGO):</label>
          <input
            type="number"
            id="event_price"
            name="event_price"
            step="0.01"
            value={formData.event_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            cols={50}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Event</button>
        </div>
      </form>
      {transactionId ? (
        <p>Transaction ID: {transactionId}</p>
      ) : (
        <p>Creating Transaction...</p>
      )}
    </div>
  );
};

export default CreateEvent;
