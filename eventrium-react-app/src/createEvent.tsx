import React, { useState, useEffect } from 'react';
import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';

// Replace with your Algorand node information
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const appId = 434856235; // Replace with your application ID

const CreateEvent: React.FC = () => {
  // State variables
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [peraWalletConnect, setPeraWalletConnect] = useState<PeraWalletConnect | null>(null);
  const [eventID, setEventID] = useState<string | null>(null); // Event ID (unique identifier)

  // Form data state
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    event_price: '',
    description: '',
  });


  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  console.log(eventID + "before submit");
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {

    console.log(eventID + "handle submit");
    event.preventDefault();

    if (!walletAddress) {
      console.error('Wallet address is not available. Please connect to your wallet.');
      return;
    }
 


    try {
      console.log(eventID + "initial");
      // Initialize the Algorand client
      const client = new algosdk.Algodv2(algodToken, algodServer, 443);
      const params: algosdk.SuggestedParams = await client.getTransactionParams().do();

        console.log(eventID);
      // Convert eventDetails to the required format
      const eventDetails = {
        eventID: eventID,
        event_name: formData.event_name,
        event_date: formData.event_date,
        event_price:formData.event_price, // Event Price in microAlgos
        description: formData.description,
      };

      // Encode eventDetails as Uint8Array
      const eventDetailsArray = [Uint8Array.from(algosdk.encodeObj(eventDetails))];

      // Create an Application NoOp transaction
      const txn = algosdk.makeApplicationNoOpTxn(
        walletAddress,
        params,
        appId,
        eventDetailsArray
      );

      try {
        // Sign the transaction using PeraWalletConnect
        const signedTxn = await peraWalletConnect?.signTransaction([[{ txn }]]);
        if (!signedTxn) {
          console.error('Error signing the transaction.');
          return;
        }

        // Send the signed transaction
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

  
  console.log(eventID + "test");

  // Effect to initialize PeraWalletConnect and connect to wallet
  useEffect(() => {
    // Instantiate PeraWalletConnect when the component is mounted
    const walletConnect = new PeraWalletConnect();
    setPeraWalletConnect(walletConnect);

    // Reconnect to session when the component is mounted
    walletConnect.reconnectSession().then((accounts) => {
      if (accounts.length) {
        const newAddress = accounts[0];
        setWalletAddress(newAddress);
      }
    });

     // Generate a random event ID (you can use any suitable method)
  const randomID = Math.random().toString(36).substr(2, 9); // Example random ID
  setEventID(randomID);


  }, []);

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
      {<p>Event ID: {eventID}</p>}
    </div>
  );
};

export default CreateEvent;
