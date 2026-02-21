import React from "react";
import donorboy from '../../assets/donorboy.png';
import savedonate from "../../assets/savedonate.jpeg";
import "./Donate.css";

const Donate = () => {
  return (
    <div className="donate-page">

      {/* Hero Section */}
      <section className="donate-hero">
        <div className="hero-text">
          <h1>Become a Blood Hero</h1>
          <p>Save lives with your blood donation</p>
          <button className="primary-btn">Register as Donor</button>
        </div>

        <div className="hero-image">
          <img src={donorboy} alt="Blood Donor" />
        </div>
      </section>

      {/* Why Donate */}
      <section className="why-donate">
        <h2>Why Be a Blood Donor?</h2>
        <div className="why-cards">
          <div className="card">❤️ <h4>Save Lives</h4><p>Help save up to 3 lives</p></div>
          <div className="card">⏱️ <h4>Quick & Simple</h4><p>Takes less than an hour</p></div>
          <div className="card">💉 <h4>Health Benefits</h4><p>Improves blood circulation</p></div>
          <div className="card">😊 <h4>Feel Good</h4><p>Make a real difference</p></div>
        </div>
      </section>

      {/* Blood Type Matching */}
      <section className="blood-types">
        <h2>Who Can You Save?</h2>
        <img src={savedonate} alt="Blood Compatibility" />
      </section>

      {/* Donation Process */}
      <section className="donation-process">
        <h2>Donation Process</h2>
        <div className="process-steps">
          <div className="step">1️⃣ Register</div>
          <div className="step">2️⃣ Get Matched</div>
          <div className="step">3️⃣ Donate</div>
          <div className="step">4️⃣ Save Life</div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="eligibility">
        <h2>Eligibility Guidelines</h2>
        <ul>
          <li>Age: 18–65 years</li>
          <li>Weight: 50kg+</li>
          <li>Healthy & feeling well</li>
          <li>No recent illness or surgery</li>
        </ul>
      </section>

    </div>
  );
};

export default Donate;
