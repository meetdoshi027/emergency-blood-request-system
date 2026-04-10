import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // ✅ EXACT 4 FUTURE + 4 PAST
  const events = [
    // FUTURE
    {title:"Blood Donation Camp",location:"Ahmedabad",date:"2026-05-20",image:img1},
    {title:"Health Checkup Camp",location:"Surat",date:"2026-06-10",image:img2},
    {title:"Mega Blood Drive",location:"Vadodara",date:"2026-07-01",image:img3},
    {title:"Emergency Blood Camp",location:"Rajkot",date:"2026-08-15",image:img1},

    // PAST
    {title:"Gandhinagar Blood Camp",location:"Gandhinagar",date:"2024-04-10",image:img2},
    {title:"Vadodara Mega Drive",location:"Vadodara",date:"2024-02-22",image:img3},
    {title:"Surat Health Camp",location:"Surat",date:"2024-01-10",image:img1},
    {title:"Ahmedabad Blood Camp",location:"Ahmedabad",date:"2023-12-05",image:img2},
  ];

  const pastEvents = events.filter(e => e.date < today).slice(0,4);
  const futureEvents = events.filter(e => e.date > today).slice(0,4);

  const navigate = useNavigate();

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
            <p className="location">📍 {event.location}</p>
            <p className="date">📅 {formatDate(event.date)}</p>

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

        {/* HERO */}
        <div className="hero">
          <div className="hero-text">
            <h1>Community Health Events</h1>
            <p>Join blood donation camps, health checkups & wellness drives</p>
            <button className="explore-btn">Explore Events</button>
          </div>
          <img src={img3} alt="hero"/>
        </div>

        {/* UPCOMING */}
        <h2 className="section-title">Upcoming Events</h2>
        {renderEvents(futureEvents,"future")}

        {/* PAST */}
        <h2 className="section-title">Past Events</h2>
        {renderEvents(pastEvents,"past")}

        {/* 🔴 HOST EVENT SECTION */}
        <div className="host-section">
          <div className="host-left">
            <h2>Want to Host an Event?</h2>
            <p>
              Partner with us to organize your own blood donation camp and make a difference!
            </p>
            <button className="host-btn">Host an Event</button>
          </div>

          <div className="host-right">
            <h3>Emergency Contact</h3>
            <p>📞 +91 9824798785</p>
            <p>📧 help@connectlife.org</p>
            <p>📞 +91 9033363065</p>
          </div>
        </div>

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