import React from "react";
import "./Contactuspath.css";
import missionBack from "../../assets/aboutus2bg.png";

const Contactuspath = () => {
  return (
    <section
      className="contact-path"
      style={{ backgroundImage: `url(${missionBack})` }}
    >
      <div className="contact-path-overlay">
        <div className="contact-path-content">
          <h2>Contact Us</h2>

          <nav className="breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span className="active">Contact Us</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Contactuspath;
