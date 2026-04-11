import React from "react";
import "./Privacy.css";
import Footer from "../footer/footer";
const Privacy = () => {
  return (
    <>
    
    <div className="privacy-page">
      <div className="container">

        {/* ===== TITLE ===== */}
        <div className="privacy-header">
          <h2>Privacy Policy – Emergency Blood Request Platform</h2>

          <p>
            Your privacy is extremely important to us. This Emergency Blood
            Request Platform is designed to connect blood donors and recipients
            quickly and efficiently while ensuring that your personal
            information remains safe and secure. This Privacy Policy explains
            how we collect, use, and protect your data.
          </p>
        </div>

        {/* ===== INFORMATION COLLECTION ===== */}
        <div className="privacy-section">
          <strong>Information We Collect</strong>

          <p>
            We may collect personal information such as your name, contact
            number, email address, blood group, and location. This information
            is necessary to connect donors with recipients during emergencies
            and improve the efficiency of our platform.
          </p>
        </div>

        {/* ===== USE OF INFORMATION ===== */}
        <div className="privacy-section">
          <strong>How We Use Your Information</strong>

          <p>
            The information we collect is used to:
            <br />• Connect blood donors with patients in need
            <br />• Send emergency alerts and notifications
            <br />• Improve user experience and platform performance
            <br />• Maintain safety and prevent misuse of the platform
          </p>
        </div>

        {/* ===== DATA SECURITY ===== */}
        <div className="privacy-section">
          <strong>Data Security</strong>

          <p>
            We implement strict security measures to protect your personal data.
            However, no method of transmission over the internet is 100% secure,
            and we cannot guarantee absolute security.
          </p>
        </div>

        {/* ===== THIRD PARTY ===== */}
        <div className="privacy-section">
          <strong>Third-Party Sharing</strong>

          <p>
            We do not sell or rent your personal information. Your data may only
            be shared with relevant users (donors/recipients) during emergency
            requests or if required by law.
          </p>
        </div>

        {/* ===== COOKIES ===== */}
        <div className="privacy-section">
          <strong>Cookies</strong>

          <p>
            Our platform may use cookies to enhance user experience. You can
            disable cookies in your browser settings, but some features may not
            function properly.
          </p>
        </div>

        {/* ===== USER RIGHTS ===== */}
        <div className="privacy-section">
          <strong>Your Rights</strong>

          <p>
            You have the right to update, modify, or delete your personal
            information at any time by contacting us or through your account
            settings.
          </p>
        </div>

        {/* ===== POLICY UPDATE ===== */}
        <div className="privacy-section">
          <strong>Changes to Privacy Policy</strong>

          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page and will be effective immediately.
          </p>
        </div>

        {/* ===== CONSENT ===== */}
        <div className="privacy-section">
          <strong>Consent</strong>

          <p>
            By using our platform, you agree to the terms of this Privacy Policy.
          </p>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Privacy;