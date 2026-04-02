import React, { useState } from "react";
import "./UserDashboard.css";

/* IMPORT YOUR PAGES */
import Home from "../pages/Home.jsx";
import BloodRequest from "../BloodRequest/BloodRequest";
import Donate from "../Donate/Donate";
import Event from "../Event/Event";
import Aboutus from "../Aboutus/Aboutus";
import Contactus from "../pages/Contactus.jsx";


const UserDashboard = () => {

  /* ===== STATE FOR ACTIVE PAGE ===== */
  const [activePage, setActivePage] = useState("home");

  /* ===== FUNCTION TO RENDER PAGE ===== */
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "bloodrequest":
        return <BloodRequest />;
       case "donate":
        return <Donate />; 
      case "event":
        return <Event />;
      case "about":
        return <Aboutus />;
      case "contact":
        return <Contactus />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="user-container">

      {/* ===== SIDEBAR ===== */}
      <aside className="user-sidebar">
        <h2 className="logo">Connect Life</h2>

        <ul className="menu">
          <li onClick={() => setActivePage("home")}>Home</li>
          <li onClick={() => setActivePage("bloodrequest")}>Request Blood</li>
          <li onClick={() => setActivePage("donate")}>Donate</li>
          <li onClick={() => setActivePage("event")}>Event</li>
          <li onClick={() => setActivePage("about")}>About Us</li>
          <li onClick={() => setActivePage("contact")}>Contact</li>
        </ul>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="user-main">

        {/* 🔥 DYNAMIC PAGE LOAD HERE */}
        {renderPage()}

      </main>
    </div>
  );
};

export default UserDashboard;