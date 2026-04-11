import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Event.css";
import EventForm from "./EventForm";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";

import img1 from "../../assets/Megablood.jpg";
import img2 from "../../assets/hospital.jpg";
import img3 from "../../assets/togetherblood.jpg";

const Event = () => {

  const today = new Date().toISOString().split("T")[0];

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dbEvents, setDbEvents] = useState([]);

  const navigate = useNavigate();

  // ✅ Fetch events from DB
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://localhost:7156/api/HospitalEvent");

        const formatted = res.data.map(e => ({
          title: e.eventName,
          organization: e.organizationName,
          date: e.date,
          location: e.location,
          image: `https://localhost:7156${e.imagePath}`,
        }));

        setDbEvents(formatted);

      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Static events
  const events = [
    {title:"Blood Donation Camp",location:"Ahmedabad",date:"2026-05-20",image:img1},
    {title:"Health Checkup Camp",location:"Surat",date:"2026-06-10",image:img2},
    {title:"Mega Blood Drive",location:"Vadodara",date:"2026-07-01",image:img3},
    {title:"Emergency Blood Camp",location:"Rajkot",date:"2026-08-15",image:img1},

    {title:"Gandhinagar Blood Camp",location:"Gandhinagar",date:"2024-04-10",image:img2},
    {title:"Vadodara Mega Drive",location:"Vadodara",date:"2024-02-22",image:img3},
    {title:"Surat Health Camp",location:"Surat",date:"2024-01-10",image:img1},
    {title:"Ahmedabad Blood Camp",location:"Ahmedabad",date:"2023-12-05",image:img2},
  ];

  const pastEvents = events.filter(e => e.date < today);
  const futureEvents = events.filter(e => e.date > today);

  const allFutureEvents = [...futureEvents, ...dbEvents];

  const handleRegister = (event) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setSelectedEvent(event);
    setShowForm(true);
  };

  const renderEvents = (list, type) => (
    <div className="event-grid">
      {list.map((event,index)=>(
        <div className="event-card" key={index}>

          <div className={`tag ${type}`}>
            {type === "future" ? "Upcoming" : "Completed"}
          </div>

          <img src={event.image} alt="event"/>

          <div className="event-content">
            <h3>{event.title}</h3>

            {event.organization && <p>🏥 {event.organization}</p>}
            {event.location && <p>📍 {event.location}</p>}

            <p>📅 {formatDate(event.date)}</p>

            {type === "future" ? (
              <button className="btn" onClick={()=>handleRegister(event)}>
                Register
              </button>
            ) : (
              <button className="btn light">View Details</button>
            )}
          </div>

        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="event-container">

        <h2 className="section-title">Upcoming Events</h2>
        {renderEvents(allFutureEvents,"future")}

        <h2 className="section-title">Past Events</h2>
        {renderEvents(pastEvents,"past")}

        {showForm && (
          <EventForm 
            event={selectedEvent}
            closeForm={() => setShowForm(false)}
          />
        )}

      </div>

      <Footer />
    </>
  );
};

export default Event;