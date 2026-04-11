import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HostEvents.css";

const HostEvents = () => {

  //const hospital = JSON.parse(localStorage.getItem("orgData"));

  const [event, setEvent] = useState({
    eventName: "",
    
    date: "",
    location: ""
  });

  const [image, setImage] = useState(null);
  const [eventsList, setEventsList] = useState([]);

  // ✅ FIX: declare BEFORE useEffect
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://localhost:7156/api/HospitalEvent");
      setEventsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

   useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await axios.get("https://localhost:7156/api/HospitalEvent");
        setEventsList(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadEvents();
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image) {
    alert("Please upload image ❌");
    return;
  }

  const formData = new FormData();

  formData.append("eventName", event.eventName);
  
  formData.append("date", event.date);
  formData.append("location", event.location);
  formData.append("image", image);

  try {
    await axios.post(
  "https://localhost:7156/api/HospitalEvent",
  formData,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);

    alert("Event Created ✅");

    fetchEvents();

    setEvent({
      eventName: "",
     
      date: "",
      location: ""
    });

    setImage(null);

  } catch (err) {
    console.error(err);
    alert("Error creating event ❌");
  }
};

  return (
    <div className="host-events">

      <h2>🎉 Host Blood Donation Event</h2>

      <form onSubmit={handleSubmit} className="event-form">

        <input 
          type="file" 
          required
          onChange={(e) => setImage(e.target.files[0])} 
        />

        <input
          name="eventName"
          placeholder="Event Name"
          value={event.eventName}
          onChange={handleChange}
          required
        />

       
       
       

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Event</button>

      </form>

      {/* EVENTS */}
      <div className="event-grid">
        {eventsList.length === 0 ? (
          <p>No events created yet</p>
        ) : (
          eventsList.map((e, i) => (
            <div key={i} className="event-card">

              <img
                src={`https://localhost:7156${e.imagePath}`}
                alt="event"
              />

              <div className="event-content">
                <h3>{e.eventName}</h3>
                <p>🏥 {e.organizationName}</p>
                 <p>📍 {e.location}</p>
                <p>📅 {new Date(e.date).toLocaleDateString()}</p>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default HostEvents;