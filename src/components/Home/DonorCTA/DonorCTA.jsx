import React from "react";
import "./DonorCTA.css";
import ctaBg from "../../../assets/donor-cta-bg.png";
import donateIcon from "../../../assets/icon-donate-blood.png";
import { useNavigate } from "react-router-dom";
const DonorCTA = () => {
  const navigate = useNavigate();
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
            <button className="donor-primary" onClick={()=>navigate("/DonorRegister")}>Register as Donor</button>
            <button className="donor-secondary" onClick={()=>navigate("/BloodRequest")}>Request Blood</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorCTA;
