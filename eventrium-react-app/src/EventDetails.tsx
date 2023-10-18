import React, { useState } from "react";

function EventDetails() {
  const [eventID, setEventID] = useState(""); // Input field for event ID
  const [eventDetails, setEventDetails] = useState<{
    eventName: string;
    eventDate: string;
    eventPrice: number;
    description: string;
  } | null>(null);

  const handleGetEventDetails = async () => {
    if (!eventID) {
      console.error("Please enter an event ID.");
      return;
    }

    const storedEventDetails = localStorage.getItem("eventDetails");

    if (storedEventDetails) {
      const eventData = JSON.parse(storedEventDetails);

      if (eventData) {
        setEventDetails(
          eventData as {
            eventName: string;
            eventDate: string;
            eventPrice: number;
            description: string;
          }
        );
      } else {
        console.error("Invalid event data in localStorage.");
        setEventDetails(null);
      }
    } else {
      console.log("No event details found in localStorage.");
    }
  };

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
