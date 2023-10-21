import React, { useState, useEffect } from 'react';

const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

const EventList: React.FC = () => {
  const [searchEventID, setSearchEventID] = useState<string>('');
  const [eventDetails, setEventDetails] = useState<any>(null);

  const handleSearchEvent = (eventID: string) => {
    const selectedEvent = existingEvents.find((event: any) => event.eventID === eventID);
    setEventDetails(selectedEvent || null);
  };

  return (
    <div className='form'>
      {existingEvents.length > 0 ? (
        <div>
          <p>Search for an Event by Event ID:</p>
          <input
            type="text"
            value={searchEventID}
            onChange={(e) => setSearchEventID(e.target.value)}
            placeholder="Enter Event ID"
          />
          <button onClick={() => handleSearchEvent(searchEventID)}>Search</button>
        </div>
      ) : (
        <p>No events stored in local storage.</p>
      )}

      {eventDetails && (
        <div>
          <br></br>
          <h3>Event Details:</h3><br></br>
          <p>Event ID: {eventDetails.eventID}</p>
          <p>Event Name: {eventDetails.eventDetails.event_name}</p>
          <p>Event Date: {eventDetails.eventDetails.event_date}</p>
          <p>Event Price: {eventDetails.eventDetails.event_price}</p>
          <p>Description: {eventDetails.eventDetails.description}</p>
          <p>Transaction ID: {eventDetails.transactionId}</p>
          <p>Wallet Address: {eventDetails.walletAddress}</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
