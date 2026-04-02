import React, { useState } from "react";
import "./HostEvents.css";

const HostEvents = () => {

  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: ""
  });

  const [eventsList, setEventsList] = useState([]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!event.name || !event.date || !event.location) {
      alert("Please fill all required fields");
      return;
    }

    setEventsList([...eventsList, event]);

    setEvent({
      name: "",
      date: "",
      location: "",
      description: ""
    });
  };

  return (
    <div className="host-events">

      <h2>🎉 Host Blood Donation Event</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="event-form">

        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={event.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={event.description}
          onChange={handleChange}
        />

        <button type="submit">Create Event</button>
      </form>

      {/* EVENTS LIST */}
      <div className="event-list">
        <h3>📅 Upcoming Events</h3>

        {eventsList.length === 0 ? (
          <p>No events created yet</p>
        ) : (
          eventsList.map((e, index) => (
            <div key={index} className="event-card">
              <h4>{e.name}</h4>
              <p>📍 {e.location}</p>
              <p>📅 {e.date}</p>
              <p>{e.description}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default HostEvents;