import React from "react";
import "./HomeHero.css";
import  {motion} from 'framer-motion';
import heroBg from "../../../assets/home-hero-bg.png";
import heroIllustration from "../../../assets/home-hero-illustration.png";
import requestIcon from "../../../assets/icon-request-blood.png";
import donateIcon from "../../../assets/icon-donate-blood.png";
import { useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="home-hero-container">
        {/* LEFT CONTENT */}
        <div className="home-hero-text">
          <motion.h1 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>
            Emergency Blood <span>Request & Donation</span> Platform
          </motion.h1>

          <motion.p initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}}>
            Connect Life helps patients, donors, and hospitals connect instantly
            during blood emergencies. Every second matters  act now save lives.
          </motion.p>

          <motion.div initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}} className="home-hero-actions">
            <button className="btn-primary" onClick={()=> navigate("/BloodRequest")}>
              <img src={requestIcon} alt="Request Blood" />
              Request Blood
            </button>

            <button className="btn-secondary" onClick={()=> navigate("/donate")}>
              <img src={donateIcon} alt="Donate Blood" />
              Become a Donor
            </button>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="home-hero-image">
          <motion.img initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} src={heroIllustration} alt="Emergency Blood Support" />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
