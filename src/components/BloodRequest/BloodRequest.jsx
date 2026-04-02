
import React from "react";
import "./BloodRequest.css";
import requestImg from "../../assets/blood.webp";
import bgImg from "../../assets/blood.webp";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";

const BloodRequest = () => {

  const navigate = useNavigate();

  return (
    
<>
     <Navbar/>
    <div className="blood-request">

      {/* HERO */}
      <section className="hero" style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Emergency Blood Needed?</h1>
          <p>Connect with nearby donors instantly and save lives</p>

          <div className="hero-buttons">
            <button className="btn-primary">Create Request</button>
            <button 
              className="btn-secondary"
              onClick={() => navigate("/DonorList")}
              >
              Find Donors
            </button>
          </div>
        </div>
      </section>

      {/* LIVE ALERT */}
      <section className="alert-bar">
        <p>🚨 3 Emergency requests nearby • O+ and A- urgently needed</p>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>How We Help You Fast</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>⚡ Instant Request</h3>
            <p>Create request in seconds during emergency</p>
          </div>

          <div className="feature-card">
            <h3>📍 Smart Matching</h3>
            <p>Nearby donors are notified instantly</p>
          </div>

          <div className="feature-card">
            <h3>📞 Direct Contact</h3>
            <p>Talk to donors without delay</p>
          </div>

          <div className="feature-card">
            <h3>❤️ Life Saving</h3>
            <p>Every request can save a life</p>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <h2>Simple 4-Step Process</h2>

        <div className="steps">

          <div className="step">
            <span>1</span>
            <h4>Create Request</h4>
          </div>

          <div className="step">
            <span>2</span>
            <h4>Notify Donors</h4>
          </div>

          <div className="step">
            <span>3</span>
            <h4>Get Response</h4>
          </div>

          <div className="step">
            <span>4</span>
            <h4>Save Life</h4>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">

        <div className="cta-left">
          <h2>Your One Request Can Save a Life</h2>
          <p>
            Thousands of patients need blood every day.
            Don't wait — create a request and connect instantly.
          </p>

          <button className="btn-primary big-btn">
            Request Blood Now
          </button>
        </div>

        <div className="cta-right">
          <img src={requestImg} alt="Blood Request"/>
        </div>

      </section>

    </div>
    
              <Footer/>
              </>
             
  );
};

export default BloodRequest;

