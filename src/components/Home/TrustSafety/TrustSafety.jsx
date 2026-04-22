import React from "react";
import "./TrustSafety.css";
import { motion } from "framer-motion";
import icon24x7 from "../../../assets/icon-24x7.png";
import iconVerified from "../../../assets/icon-verified.png";
import iconSecure from "../../../assets/icon-secure.png";
import iconFast from "../../../assets/icon-fast.png";

const TrustSafety = () => {
  return (
    <section className="trust-section">
      <div className="trust-container">
        <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>
      Trusted. Secure. Always Available.</motion.h2>
        <motion.p initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:0.8,type:"spring"}} viewport={{once:true}}  className="trust-subtitle">
          Built to support emergencies with reliability and care
        </motion.p>

        <div className="trust-grid">
          <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.7,type:"spring"}} viewport={{once:true}} className="trust-card">
            <img src={icon24x7} alt="24x7 Availability" />
            <h3>24×7 Emergency Support</h3>
            <p>
              Our platform operates round-the-clock to ensure no request goes unanswered.
            </p>
          </motion.div>

          <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.7,type:"spring"}} viewport={{once:true}} className="trust-card">
            <img src={iconVerified} alt="Verified Donors" />
            <h3>Verified Donors & Hospitals</h3>
            <p>
              Every donor and organization is verified to ensure genuine help.
            </p>
          </motion.div>

          <motion.div initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.7,type:"spring"}} viewport={{once:true}} className="trust-card">
            <img src={iconSecure} alt="Secure Platform" />
            <h3>Secure & Private</h3>
            <p>
              Your personal and medical data is protected with industry-grade security.
            </p>
          </motion.div>

          <motion.div initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.7,type:"spring"}} viewport={{once:true}} className="trust-card">
            <img src={iconFast} alt="Fast Response" />
            <h3>Fast Response System</h3>
            <p>
              Smart matching ensures quick donor connections during critical moments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
