import React from "react";
import "./HowItWorks.css";

import requestIcon from "../../../assets/icon-request-blood.png";
import formIcon from "../../../assets/icon-form.png";
import notifyIcon from "../../../assets/icon-notify.png";
import connectIcon from "../../../assets/icon-connect.png";
import saveLifeIcon from "../../../assets/icon-save-life.png";

const steps = [
  {
    icon: requestIcon,
    title: "Request Blood",
    text: "Submit an emergency blood request with patient details.",
  },
  {
    icon: formIcon,
    title: "Fill Quick Form",
    text: "Enter blood group, location, and urgency in seconds.",
  },
  {
    icon: notifyIcon,
    title: "Notify Donors",
    text: "Nearby donors and hospitals are instantly notified.",
  },
  {
    icon: connectIcon,
    title: "Get Connected",
    text: "Direct contact is established without delays.",
  },
  {
    icon: saveLifeIcon,
    title: "Save Lives",
    text: "Timely blood donation helps save precious lives.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <p className="subtitle">
          A simple, fast, and reliable process designed for emergencies
        </p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <img src={step.icon} alt={step.title} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
