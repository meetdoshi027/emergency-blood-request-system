import React from "react";
import "./ImpactStats.css";
import statsBg from "../../../assets/stats-bg.png";

import saveLife from "../../../assets/icon-save-life.png";
import donors from "../../../assets/icon-verified.png";
import hospitals from "../../../assets/icon-hospital.png";
import fast from "../../../assets/icon-fast.png";

const ImpactStats = () => {
  return (
    <section
      className="impact-section"
      style={{ backgroundImage: `url(${statsBg})` }}
    >
      <div className="impact-overlay">
        <div className="impact-container">
          <h2>Our Life-Saving Impact</h2>
          <p className="impact-subtitle">
            Trusted by donors, hospitals and blood banks nationwide
          </p>

          <div className="impact-grid">
            <div className="impact-card">
              <img src={saveLife} alt="Lives Saved" />
              <h3>25,000+</h3>
              <p>Lives Saved</p>
            </div>

            <div className="impact-card">
              <img src={donors} alt="Donors" />
              <h3>12,000+</h3>
              <p>Verified Donors</p>
            </div>

            <div className="impact-card">
              <img src={hospitals} alt="Hospitals" />
              <h3>850+</h3>
              <p>Hospitals Connected</p>
            </div>

            <div className="impact-card">
              <img src={fast} alt="Fast Response" />
              <h3>&lt; 10 min</h3>
              <p>Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
