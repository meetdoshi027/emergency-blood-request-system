import React, { useState } from "react";
import "./Event.css";
import EventForm from "./EventForm";
import Navbar from "../Navbar/Navbar";

/* IMAGES */
import img1 from "../../assets/Megablood.jpg";
import img2 from "../../assets/hospital.jpg";
import img3 from "../../assets/togetherblood.jpg";
import bg from "../../assets/blood.webp";
import Footer from "../footer/footer";

const Event = () => {

  const today = new Date().toISOString().split("T")[0];

  // ✅ DATE FORMAT FUNCTION
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // ✅ STATE
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ✅ EVENTS DATA
  const events = [
    { title: "Blood Donation Camp", organization: "Red Cross", date: "2025-03-01", image: img1, description: "Donate blood" },
    { title: "Community Blood Drive", organization: "NGO Trust", date: "2025-02-15", image: img2, description: "Helping people" },
    { title: "Health Awareness Camp", organization: "City NGO", date: "2025-01-10", image: img3, description: "Awareness" },
    { title: "Old Blood Camp", organization: "Health Org", date: "2024-12-20", image: img1, description: "Old event" },

    { title: "Today Blood Camp 1", organization: "Local NGO", date: today, image: img2, description: "Donate today" },
    { title: "Today Blood Camp 2", organization: "City Hospital", date: today, image: img3, description: "Emergency" },
    { title: "Today Health Camp", organization: "Health Org", date: today, image: img1, description: "Free checkup" },
    { title: "Today Mega Drive", organization: "Trust Org", date: today, image: img2, description: "Join now" },

    { title: "Future Blood Camp", organization: "Apollo Hospital", date: "2026-05-20", image: img1, description: "Biggest drive" },
    { title: "Upcoming Donation", organization: "NGO Trust", date: "2026-06-10", image: img2, description: "Save lives" },
    { title: "Mega Health Camp", organization: "City Hospital", date: "2026-07-01", image: img3, description: "Free services" },
    { title: "Emergency Future Drive", organization: "Red Cross", date: "2026-08-15", image: img1, description: "Urgent" }
  ];

  // ✅ SAFE DATE FILTERING
  const pastEvents = events.filter(e => new Date(e.date) < new Date(today));
  const presentEvents = events.filter(e => e.date === today);
  const futureEvents = events.filter(e => new Date(e.date) > new Date(today));

  // ✅ REGISTER HANDLER
  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  // ✅ RENDER EVENTS
  const renderEvents = (list, type) => (
    list.length === 0 ? (
      <p className="no-events">No events available</p>
    ) : (
      <div className="event-grid">
        {list.map((event, index) => (
          <div className="event-card" key={index}>

            <img src={event.image} alt="event" />

            <div className="event-content">
              <h3>{event.title}</h3>
              <p>🏥 {event.organization}</p>
              <p>📅 {formatDate(event.date)}</p>
              <p className="desc">{event.description}</p>

              {type === "future" && (
                <button
                  className="btn"
                  onClick={() => handleRegister(event)}
                >
                  Register
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <>
      {/* ✅ Navbar only once */}
      <Navbar />

      <div
        className="event-container"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="main-title">Blood Donation Events</h1>

        <h2 className="section-title">🕘 Past Events</h2>
        {renderEvents(pastEvents, "past")}

        <h2 className="section-title">📍 Present Events</h2>
        {renderEvents(presentEvents, "present")}

        <h2 className="section-title">🚀 Future Events</h2>
        {renderEvents(futureEvents, "future")}

        {/* ✅ FORM POPUP */}
        {showForm && (
          <EventForm
            event={selectedEvent}
            closeForm={() => setShowForm(false)}
          />
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Event;