import React, { useState, useEffect } from 'react';
import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';

const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const appId = 433929418; // Replace with your application ID

const EventList: React.FC = () => {
  const [events, setEvents] = useState<string[]>([]); // Array to store eventIDs
  const [selectedEventID, setSelectedEventID] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<{
    event_name: string;
    event_date: string;
    event_price: number;
    description: string;
  } | null>(null);

  const [peraWalletConnect, setPeraWalletConnect] = useState<PeraWalletConnect | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Store the wallet address

  useEffect(() => {
    // Instantiate PeraWalletConnect when the component is mounted
    const walletConnect = new PeraWalletConnect();
    setPeraWalletConnect(walletConnect);

    // Reconnect to session when the component is mounted
    walletConnect.reconnectSession().then((accounts) => {
      if (accounts.length) {
        const newAddress = accounts[0];
        setWalletAddress(newAddress); // Set the wallet address
      }
    });
  }, []);

  useEffect(() => {
    if (!walletAddress) {
      return; // Do nothing if the wallet address is not available
    }

    async function fetchEventIDs() {
      try {
        if (!walletAddress) {
          console.error('Wallet address is not available. Please connect to your wallet.');
          return;
        }
    
        const client = new algosdk.Algodv2(algodToken, algodServer, 443);
        const localState = await client.accountApplicationInformation(walletAddress,appId).do(); // Use ! to assert non-null
    
        if (!localState || !localState['apps'] || !localState['apps'][0] || !localState['apps'][0]['params']) {
          console.error('Error: No app data found in localState.');
          return;
        }
    
        const eventDetails = localState['apps'][0]['params']['global-state'];
    
        const eventIDs = eventDetails
          .filter((item: { key: string }) => item.key.startsWith('Event ID: '))
          .map((item: { key: string }) => item.key.replace('Event ID: ', ''));
    
        setEvents(eventIDs);
      } catch (error) {
        console.error('Error fetching event IDs:', error);
      }
    }

    fetchEventIDs();
  }, [walletAddress]);

  const handleEventSelection = (eventID: string) => {
    setSelectedEventID(eventID);
  };

  const handleRetrieveEventDetails = async () => {
    if (!selectedEventID) {
      console.error('Please select an event before retrieving details.');
      return;
    }

    try {
      const client = new algosdk.Algodv2(algodToken, algodServer, 443);
      if (!walletAddress) {
        console.error('Wallet address is not available. Please connect to your wallet.');
        return;
      }
      const localState = await client.accountInformation(walletAddress!).do(); // Use ! to assert non-null

      const eventDetails = localState['apps'][0]['params']['global-state'];
      const eventDetailsForID = eventDetails.find(
        (item: { key: string }) => item.key === `Event ID: ${selectedEventID}`
      );

      if (eventDetailsForID) {
        const eventDetailsData = algosdk.decodeObj(eventDetailsForID.value);
        setEventDetails(eventDetailsData as {
          event_name: string;
          event_date: string;
          event_price: number;
          description: string;
        });
      } else {
        setEventDetails(null);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  return (
    <div>
      <h2>Event List</h2>
      {walletAddress ? (
        <div>
          <p>Select an Event:</p>
          <select
              value={selectedEventID || ''} // Use '' as the default value if selectedEventID is null
              onChange={(e) => handleEventSelection(e.target.value)}
          >
          <option value="" disabled>
            Select an Event
          </option>
          {events.map((eventID) => (
          <option key={eventID} value={eventID}>
            Event ID: {eventID}
          </option>
          ))}
          </select>
          <button onClick={handleRetrieveEventDetails}>Retrieve Event Details</button>
        </div>
      ) : (
        <p>Wallet address is not available. Please connect to your wallet.</p>
      )}
      {eventDetails ? (
        <div>
          <h3>Event Details:</h3>
          <p>Event Name: {eventDetails.event_name}</p>
          <p>Event Date: {eventDetails.event_date}</p>
          <p>Event Price: {eventDetails.event_price} ALGO</p>
          <p>Description: {eventDetails.description}</p>
        </div>
      ) : (
        <p>Event not found or details not available.</p>
      )}
    </div>
  );
};

export default EventList;
