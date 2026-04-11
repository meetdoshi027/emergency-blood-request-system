import React from "react";
import "./footer.css";
import logo from "../../assets/logo.jpg";
import Privacy from "../Privacy/Privacy";
import Terms from "../Terms/Terms";
import { useNavigate } from "react-router-dom";

const Footer = () => {
   const navigate = useNavigate();
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
            <li onClick={()=> navigate("/Home")}>Home</li>
            <li onClick={()=> navigate("/Aboutus")}>About Us</li>
            <li onClick={()=> navigate("/BloodRequest")}>Request Blood</li>
            <li onClick={()=> navigate("/donate")}>Become Donor</li>
            <li onClick={()=> navigate("/Contactus")}>Contact Us</li>
            <li onClick={()=> navigate("/Privacy")}>Privacy Policy</li>
            <li onClick={()=> navigate("/Terms")}>Terms & Conditions</li>
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

export default Footer;
