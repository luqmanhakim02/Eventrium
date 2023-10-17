import React, { useState } from 'react';
import { getLocalState } from './localState'; // Import your getLocalState function

function EventDetails() {
  const [eventID, setEventID] = useState(''); // Input field for event ID
  const [eventDetails, setEventDetails] = useState<{
    eventName: string;
    eventDate: string;
    eventPrice: number;
    description: string;
  } | null>(null);

  const handleGetEventDetails = async () => {
    if (!eventID) {
      console.error('Please enter an event ID.');
      return;
    }

    // Call the getLocalState function to retrieve event details
    const eventData = await getLocalState(eventID);

    if (eventData) {
      setEventDetails(eventData as {
        eventName: string;
        eventDate: string;
        eventPrice: number;
        description: string;
      });
    } else {
      console.error('Event not found or details not available.');
      setEventDetails(null);
    }
  }

  return (
    <div>
      <h2>Event Details</h2>
      <div>
        <label>Event ID:</label>
        <input
          type="text"
          value={eventID}
          onChange={(e) => setEventID(e.target.value)}
        />
        <button onClick={handleGetEventDetails}>Get Event Details</button>
      </div>
      {eventDetails && (
        <div>
          <h3>Event Details:</h3>
          <p>Event Name: {eventDetails.eventName}</p>
          <p>Event Date: {eventDetails.eventDate}</p>
          <p>Event Price: {eventDetails.eventPrice} ALGO</p>
          <p>Description: {eventDetails.description}</p>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
