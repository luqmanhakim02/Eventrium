import React, { useState, useEffect } from "react";
import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

// Replace with your Algorand node information
const algodToken = "";
const algodServer = "https://testnet-api.algonode.cloud";
const appId = 438536777; // Replace with your application ID

const CreateEvent: React.FC = () => {
  // State variables
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [peraWalletConnect, setPeraWalletConnect] =
    useState<PeraWalletConnect | null>(null);
  const [eventID, setEventID] = useState<string>("");
  // Event ID (unique identifier)

  // Form data state
  const [formData, setFormData] = useState({
    event_name: "",
    event_date: "",
    event_price: "",
    description: "",
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!walletAddress) {
      console.error(
        "Wallet address is not available. Please connect to your wallet."
      );
      return;
    }

    try {
      // Initialize the Algorand client
      const client = new algosdk.Algodv2(algodToken, algodServer, 443);
      const params: algosdk.SuggestedParams = await client
        .getTransactionParams()
        .do();

      // Convert eventDetails to the required format
      const eventDetails = {
        eventID: eventID,
        event_name: formData.event_name,
        event_date: formData.event_date,
        event_price: formData.event_price, // Event Price in microAlgos
        description: formData.description,
      };

      // Encode eventDetails as Uint8Array
      const eventDetailsArray = [
        Uint8Array.from(algosdk.encodeObj(eventDetails)),
      ];

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
          console.error("Error signing the transaction.");
          return;
        }

        // Send the signed transaction
        const response = await client.sendRawTransaction(signedTxn[0]).do();

        if (response.txId) {
          const txId = response.txId;
          console.log(`Transaction ID: ${txId}`);
          console.log("Event created successfully.");
          setTransactionId(txId);

          // Storing an Event
          const event = {
            eventID: eventID,
            transactionId: txId,
            eventDetails: eventDetails,
            walletAddress: walletAddress,
            params: params,
            appId: appId,
            eventDetailsArray: eventDetailsArray,
          };

          // Retrieve existing events or initialize an empty array
          const existingEvents = JSON.parse(
            localStorage.getItem("events") || "[]"
          );

          // Append the new event to the array
          existingEvents.push(event);

          // Store the updated array in local storage
          localStorage.setItem("events", JSON.stringify(existingEvents));
          
          if (existingEvents.length === 0) {
            console.log("No events stored in local storage.");
          } else {
            console.log("Stored Events:");
            existingEvents.forEach((event: { eventID: any; transactionId: any; eventDetails: any; walletAddress: any; params: any; appId: any; eventDetailsArray: any; }, index: number) => {
              console.log(`Event ${index + 1}:`);
              console.log(`Event ID: ${event.eventID}`);
              console.log(`Transaction ID: ${event.transactionId}`);
              console.log("Event Details:", event.eventDetails);
              console.log(`Wallet Address: ${event.walletAddress}`);
              console.log("Params:", event.params);
              console.log(`App ID: ${event.appId}`);
              console.log("Event Details Array:", event.eventDetailsArray);
              console.log("\n");
            });
          }
          
        }
      } catch (error) {
        console.error("Error signing the transaction:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


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
    <div className="form">
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
          <label htmlFor="event_image">Event Image:</label>
          <input
            type="file"
            accept="image/*" // Restrict to image files
          />
          <br></br>
          <br></br>
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
