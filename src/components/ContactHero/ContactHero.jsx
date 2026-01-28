import React from "react";
import "./ContactHero.css";
import conus1 from "../../assets/contactus1.png";

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <div className="contact-hero-container">
        <div className="contact-hero-text">
          <h1>Contact Blood Support</h1>
          <p>
            Facing a blood emergency?  
            Our platform connects donors and patients instantly.
            Reach out now and let us help save lives.
          </p>
        </div>

        <div className="contact-hero-image">
          <img src={conus1} alt="Blood Donation Support" />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
