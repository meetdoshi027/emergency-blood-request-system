import React from "react";
import "./TrustSafety.css";

import icon24x7 from "../../../assets/icon-24x7.png";
import iconVerified from "../../../assets/icon-verified.png";
import iconSecure from "../../../assets/icon-secure.png";
import iconFast from "../../../assets/icon-fast.png";

const TrustSafety = () => {
  return (
    <section className="trust-section">
      <div className="trust-container">
        <h2>Trusted. Secure. Always Available.</h2>
        <p className="trust-subtitle">
          Built to support emergencies with reliability and care
        </p>

        <div className="trust-grid">
          <div className="trust-card">
            <img src={icon24x7} alt="24x7 Availability" />
            <h3>24×7 Emergency Support</h3>
            <p>
              Our platform operates round-the-clock to ensure no request goes unanswered.
            </p>
          </div>

          <div className="trust-card">
            <img src={iconVerified} alt="Verified Donors" />
            <h3>Verified Donors & Hospitals</h3>
            <p>
              Every donor and organization is verified to ensure genuine help.
            </p>
          </div>

          <div className="trust-card">
            <img src={iconSecure} alt="Secure Platform" />
            <h3>Secure & Private</h3>
            <p>
              Your personal and medical data is protected with industry-grade security.
            </p>
          </div>

          <div className="trust-card">
            <img src={iconFast} alt="Fast Response" />
            <h3>Fast Response System</h3>
            <p>
              Smart matching ensures quick donor connections during critical moments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
