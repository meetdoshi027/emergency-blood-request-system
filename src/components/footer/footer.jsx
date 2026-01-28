import React from "react";
import "./footer.css";
import logo from "../../assets/logo.jpg"; // change if needed

const footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ABOUT */}
        <div className="footer-about">
          <img src={logo} alt="Blood Donation Platform" />
          <p>
            Our emergency blood donation platform connects donors and patients
            instantly. We are committed to saving lives by making blood
            availability fast, reliable, and accessible.
          </p>

          <div className="footer-socials">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Find Donor</li>
            <li>Request Blood</li>
            <li>Become Donor</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-links">
          <h4>Our Services</h4>
          <ul>
            <li>Emergency Blood Request</li>
            <li>Donor Registration</li>
            <li>Blood Group Search</li>
            <li>Hospital Support</li>
            <li>24/7 Emergency Help</li>
            <li>Awareness Programs</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-contact">
          <h4>Emergency Contact</h4>

          <div className="contact-block">
            <strong>Blood Emergency:</strong>
            <p>📞 +91 9913723476</p>
            <p>✉️ emergency@bloodhelp.org</p>
          </div>

          <div className="contact-block">
            <strong>Support Team:</strong>
            <p>📞 +91 9978777693</p>
            <p>✉️ support@bloodhelp.org</p>
          </div>

          <div className="contact-block">
            <strong>Other Queries:</strong>
            <p>📞 +91 9099383095</p>
            <p>✉️ info@bloodhelp.org</p>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Blood Donation Platform. All Rights Reserved.
      </div>
    </footer>
  );
};

export default footer;
