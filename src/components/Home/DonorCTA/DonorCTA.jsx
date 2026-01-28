import React from "react";
import "./DonorCTA.css";
import ctaBg from "../../../assets/donor-cta-bg.png";
import donateIcon from "../../../assets/icon-donate-blood.png";

const DonorCTA = () => {
  return (
    <section
      className="donor-cta"
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      <div className="donor-overlay">
        <div className="donor-content">
          <img src={donateIcon} alt="Donate Blood" />
          <h2>Become a Lifesaver Today</h2>
          <p>
            One donation can save up to three lives.
            Join our verified donor network and respond when it matters most.
          </p>

          <div className="donor-buttons">
            <button className="donor-primary">Register as Donor</button>
            <button className="donor-secondary">Request Blood</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorCTA;
