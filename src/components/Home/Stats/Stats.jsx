import React from "react";
import "./Stats.css";

import fastIcon from "../../../assets/icon-fast.png";
import verifiedIcon from "../../../assets/icon-verified.png";
import secureIcon from "../../../assets/icon-secure.png";
import clockIcon from "../../../assets/icon-24x7.png";

const stats = [
  {
    icon: fastIcon,
    number: "15,000+",
    label: "Emergency Requests Fulfilled",
  },
  {
    icon: verifiedIcon,
    number: "25,000+",
    label: "Verified Blood Donors",
  },
  {
    icon: secureIcon,
    number: "500+",
    label: "Registered Hospitals & Blood Banks",
  },
  {
    icon: clockIcon,
    number: "24×7",
    label: "Emergency Support Availability",
  },
];

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-overlay">
        <div className="stats-container">
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <img src={item.icon} alt={item.label} />
              <h3>{item.number}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
