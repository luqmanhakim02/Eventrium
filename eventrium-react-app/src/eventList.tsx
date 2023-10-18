import React, { useState, useEffect } from 'react';

const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

const EventList: React.FC = () => {
  const [selectedEventID, setSelectedEventID] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<any>(null);

  const handleEventSelection = (eventID: string) => {
    if (eventID !== selectedEventID) {
      setSelectedEventID(eventID);
    }
  };

  useEffect(() => {
    const selectedEvent = existingEvents.find((event: any) => event.eventID === selectedEventID);
    setEventDetails(selectedEvent || null);
  }, [selectedEventID]);
  

  return (
    <div>
      <h2>Event List</h2>
      {existingEvents.length > 0 ? (
        <div>
          <p>Select an Event:</p>
          <select
            value={selectedEventID || ''}
            onChange={(e) => handleEventSelection(e.target.value)}
          >
            <option value="" disabled>
              Select an Event
            </option>
            {existingEvents.map((event: any) => (
              <option key={event.eventID} value={event.eventID}>
                Event ID: {event.eventID}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>No events stored in local storage.</p>
      )}

      {eventDetails && (
        <div>
          <h3>Event Details:</h3>
          <p>Event ID: {eventDetails.eventID}</p>
          <p>Event Name: {eventDetails.eventDetails.event_name}</p>
          <p>Event Date: {eventDetails.eventDetails.event_date}</p>
          <p>Event Price: {eventDetails.eventDetails.event_price}</p>
          <p>Description: {eventDetails.eventDetails.description}</p>
          <p>Transaction ID: {eventDetails.transactionId}</p>
          <p>Wallet Address: {eventDetails.walletAddress}</p>
          <p>App ID: {eventDetails.appId}</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
