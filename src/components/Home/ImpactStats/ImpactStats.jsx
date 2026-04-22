import React, { useEffect, useState } from "react";
import "./ImpactStats.css";
import statsBg from "../../../assets/stats-bg.png";
import { motion } from "framer-motion";
import saveLife from "../../../assets/icon-save-life.png";
import donorsIcon from "../../../assets/icon-verified.png";
import hospitalsIcon from "../../../assets/icon-hospital.png";
import fast from "../../../assets/icon-fast.png";


import axios from "axios";

const ImpactStats = () => {

  const [stats, setStats] = useState({
    livesSaved: 0,
    donors: 0,
    hospitals: 0
  });

  // 🔥 FETCH DATA
  useEffect(() => {

    const fetchImpact = () => {
      axios.get("https://localhost:7156/api/impact")
        .then(res => {
          setStats(res.data);
        })
        .catch(err => {
          console.error("Impact API Error:", err);
        });
    };

    fetchImpact();

    const interval = setInterval(fetchImpact, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section
      className="impact-section"
      style={{ backgroundImage: `url(${statsBg})` }}
    >
      <div className="impact-overlay">
        <div className="impact-container">
          <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:0.8,type:"spring"}} viewport={{once:true}}>Our Life-Saving Impact</motion.h2>

          <motion.p initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}} className="impact-subtitle">
            Trusted by donors, hospitals and blood banks nationwide
          </motion.p>

          <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}}  className="impact-grid">

            {/* LIVES SAVED */}
            <div className="impact-card">
              <img src={saveLife} alt="Lives Saved" />
              <h3>
                {stats.requests}
              </h3>
              <p>Lives Saved</p>
            </div>

            {/* DONORS */}
            <div className="impact-card">
              <img src={donorsIcon} alt="Donors" />
              <h3>
                {stats.donors} 
              </h3>
              <p>Verified Donors</p>
            </div>

            {/* HOSPITALS */}
            <div className="impact-card">
              <img src={hospitalsIcon} alt="Hospitals" />
              <h3>
                {stats.hospitals} 
              </h3>
              <p>Hospitals Connected</p>
            </div>

            {/* STATIC */}
            <div className="impact-card">
              <img src={fast} alt="Fast Response" />
              <h3>&lt; 5 min</h3>
              <p>Avg Response Time</p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;