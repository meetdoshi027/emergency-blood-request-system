import React from "react";
import "./WhyChooseUs.css";

import requestIcon from "../../../assets/icon-request-blood.png";
import donateIcon from "../../../assets/icon-donate-blood.png";
import hospitalIcon from "../../../assets/icon-hospital.png";
import notifyIcon from "../../../assets/icon-notify.png";
import connectIcon from "../../../assets/icon-connect.png";
import saveLifeIcon from "../../../assets/icon-save-life.png";

const features = [
  {
    icon: requestIcon,
    title: "Instant Blood Requests",
    text: "Raise emergency blood requests in seconds with verified reach.",
  },
  {
    icon: donateIcon,
    title: "Quick Donor Matching",
    text: "Nearby donors are instantly notified to save valuable time.",
  },
  {
    icon: hospitalIcon,
    title: "Hospital & Blood Bank Network",
    text: "Connected with trusted hospitals and blood banks nationwide.",
  },
  {
    icon: notifyIcon,
    title: "Real-Time Notifications",
    text: "Live alerts ensure no emergency goes unnoticed.",
  },
  {
    icon: connectIcon,
    title: "Direct & Secure Communication",
    text: "Patients and donors connect safely and transparently.",
  },
  {
    icon: saveLifeIcon,
    title: "Every Action Saves Lives",
    text: "Your request or donation can become someone’s second chance.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <div className="why-container">
        <h2 className="why-title">Why Choose Our Platform</h2>
        <p className="why-subtitle">
          Built for emergencies. Designed to save lives.
        </p>

        <div className="why-grid">
          {features.map((item, index) => (
            <div className="why-card" key={index}>
              <img src={item.icon} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
