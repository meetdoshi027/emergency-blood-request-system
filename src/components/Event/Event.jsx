// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Event.css";
// import EventForm from "./EventForm";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../footer/footer";

// import img1 from "../../assets/Megablood.jpg";
// import img2 from "../../assets/hospital.jpg";
// import img3 from "../../assets/togetherblood.jpg";
// import bg from "../../assets/blood.webp";

// const Event = () => {

// const today = new Date().toISOString().split("T")[0];

// const formatDate = (date) => {
//   const d = new Date(date);
//   return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
// };


// const [showForm, setShowForm] = useState(false);
// const [selectedEvent, setSelectedEvent] = useState(null);

// // EVENTS
// const events = [
// {title:"Blood Donation Camp",organization:"Red Cross",date:"2025-03-01",image:img1,description:"Donate blood"},
// {title:"Community Blood Drive",organization:"NGO Trust",date:"2025-02-15",image:img2,description:"Helping people"},
// {title:"Health Awareness Camp",organization:"City NGO",date:"2025-01-10",image:img3,description:"Awareness"},
// {title:"Old Blood Camp",organization:"Health Org",date:"2024-12-20",image:img1,description:"Old event"},

// {title:"Today Blood Camp 1",organization:"Local NGO",date:today,image:img2,description:"Donate today"},
// {title:"Today Blood Camp 2",organization:"City Hospital",date:today,image:img3,description:"Emergency"},
// {title:"Today Health Camp",organization:"Health Org",date:today,image:img1,description:"Free checkup"},
// {title:"Today Mega Drive",organization:"Trust Org",date:today,image:img2,description:"Join now"},

// {title:"Future Blood Camp",organization:"Apollo Hospital",date:"2026-05-20",image:img1,description:"Biggest drive"},
// {title:"Upcoming Donation",organization:"NGO Trust",date:"2026-06-10",image:img2,description:"Save lives"},
// {title:"Mega Health Camp",organization:"City Hospital",date:"2026-07-01",image:img3,description:"Free services"},
// {title:"Emergency Future Drive",organization:"Red Cross",date:"2026-08-15",image:img1,description:"Urgent"}
// ];

// // FILTER
// const pastEvents = events.filter(e => e.date < today);
// const presentEvents = events.filter(e => e.date === today);
// const futureEvents = events.filter(e => e.date > today);

// const navigate = useNavigate();
// // REGISTER
// const handleRegister = (event) => {

//   const user = localStorage.getItem("user");

//   // ❌ NOT LOGGED IN
//   if (!user) {
//     alert("Please login first");
//     navigate("/login");
//     return;
//   }
//   setSelectedEvent(event);
//   setShowForm(true);
// };

// // RENDER
// const renderEvents = (list, type) => (
// <div className="event-grid">

// {list.map((event,index)=>(

// <div className={`event-card ${type}`} key={index}>

// <img src={event.image} alt="event" />

// <div className="event-content">
// <h3>{event.title}</h3>
// <p>🏥 {event.organization}</p>
// <p>📅 {formatDate(event.date)}</p>
// <p className="desc">{event.description}</p>

// {type === "future" && (
// <button 
// className="btn"
// onClick={() => handleRegister(event)}
// >
// Register
// </button>
// )}

// </div>
// </div>

// ))}

// </div>
// );

// return (
// <>
// <Navbar />

// <div className="event-container" style={{ backgroundImage: `url(${bg})` }}>

// <h1 className="main-title">Blood Donation Events</h1>

// <h2 className="section-title">🚀 Future Event</h2>
// {renderEvents(futureEvents,"future")}

// <h2 className="section-title">📍 Present Event</h2>
// {renderEvents(presentEvents,"present")}

// <h2 className="section-title">🕘 Past Event</h2>
// {renderEvents(pastEvents,"past")}

// {showForm && (
// <EventForm 
// event={selectedEvent}
// closeForm={() => setShowForm(false)}
// />
// )}

// </div>

// <Footer />
// </>
// );
// };

// export default Event;

import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";
import savedonate from "../../assets/savedonate.jpeg";
import "./Event.css";

const Events = () => {
  return (
    <>
      <Navbar />

      <div className="events-page">

        {/* HERO SECTION */}
        <section className="events-hero">
          <div className="hero-left">
            <h1>Community Health Events</h1>
            <p>
              Join blood donation camps, health checkups & wellness drives
            </p>
            <button className="primary-btn">Explore Events</button>
          </div>

          <div className="hero-right">
            <div className="hero-avatar">💪</div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="events-section">
          <h2>📍 Upcoming Events</h2>

          <div className="events-grid">

            {/* CARD 1 */}
            <div className="event-card">
              <span className="badge">Upcoming</span>
              <img src={savedonate} alt="event" />

              <div className="event-content">
                <h3>Blood Donation Camp</h3>
                <p>📍 Ahmedabad</p>
                <p>📅 2 May 2024</p>

                <button className="card-btn">Register</button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="event-card">
              <span className="badge">Upcoming</span>
              <img src={savedonate} alt="event" />

              <div className="event-content">
                <h3>Health Checkup Camp</h3>
                <p>📍 Surat</p>
                <p>📅 5 June 2024</p>

                <button className="card-btn">Register</button>
              </div>
            </div>

          </div>
        </section>

        {/* PAST EVENTS */}
        <section className="events-section">
          <h2>📍 Past Events</h2>

          <div className="events-grid">

            {/* CARD 1 */}
            <div className="event-card">
              <span className="badge completed">Completed</span>
              <img src={savedonate} alt="event" />

              <div className="event-content">
                <h3>Gandhinagar Blood Camp</h3>
                <p>📍 Gandhinagar</p>
                <p>📅 10 April 2024</p>

                <button className="outline-btn">View Details</button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="event-card">
              <span className="badge completed">Completed</span>
              <img src={savedonate} alt="event" />

              <div className="event-content">
                <h3>Vadodara Mega Drive</h3>
                <p>📍 Vadodara</p>
                <p>📅 22 February 2024</p>

                <button className="outline-btn">View Details</button>
              </div>
            </div>

          </div>
        </section>

        {/* HOST CTA */}
        <section className="host-section">
          <h2>Want to Host an Event?</h2>
          <p>
            Partner with us to organize your own blood donation camp and make a difference!
          </p>
          <button className="primary-btn">Host an Event</button>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default Events;