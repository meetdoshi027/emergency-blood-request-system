import React from "react";
import "./HomeHero.css";

import heroBg from "../../../assets/home-hero-bg.png";
import heroIllustration from "../../../assets/home-hero-illustration.png";
import requestIcon from "../../../assets/icon-request-blood.png";
import donateIcon from "../../../assets/icon-donate-blood.png";

const HomeHero = () => {
  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="home-hero-container">
        {/* LEFT CONTENT */}
        <div className="home-hero-text">
          <h1>
            Emergency Blood <span>Request & Donation</span> Platform
          </h1>

          <p>
            Connect Life helps patients, donors, and hospitals connect instantly
            during blood emergencies. Every second matters — act now.
          </p>

          <div className="home-hero-actions">
            <button className="btn-primary">
              <img src={requestIcon} alt="Request Blood" />
              Request Blood
            </button>

            <button className="btn-secondary">
              <img src={donateIcon} alt="Donate Blood" />
              Become a Donor
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="home-hero-image">
          <img src={heroIllustration} alt="Emergency Blood Support" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
