import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";
import savedonate from "../../assets/savedonate.jpeg";
import "./BloodRequest.css";
import { motion } from "framer-motion";

const BloodRequest = () => {
  const navigate = useNavigate();
  const handleRequestClick = () => {
  const user = sessionStorage.getItem("user");

  if (!user) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  navigate("/PostRequest");
};
  return (
    <>
      <Navbar />

      <div className="creative-request-page">

        {/* HERO */}
        <section className="creative-hero">
          <div className="hero-blob-container">

            <div className="blob-text">
              {/* <span className="mini-label">Emergency Support System</span> */}

              <motion.h1 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>
                Connecting <span>Donors</span><br />
                With <span>Lives in Need</span>
              </motion.h1>

              <motion.p initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}}>
                Every second matters in a medical emergency. Instantly connect with
                nearby verified donors.
              </motion.p>

              <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} className="hero-stats">
                <span>🩸 10,000+ Donors</span>
                <span>⚡ Fast Response</span>
                <span>🏥 Trusted Hospitals</span>
              </motion.div>

             <motion.button initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:1.2,type:"spring"}} viewport={{once:true}} className="blob-btn" onClick={handleRequestClick}>
                      Request Blood Now
              </motion.button>
            </div>

            <div className="abstract-shape">
              <div className="circle-pulse"></div>
              <div className="circle-pulse-delayed"></div>
              <div className="main-circle">❤️</div>
            </div>

          </div>
        </section>

        {/* COMPATIBILITY */}
        <section className="compatibility-focus">
          <div className="focus-content">

            <div className="text-side">
              <motion.h2 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Find the Right Donor Faster</motion.h2>
              <motion.p initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}}>
                Smart matching connects patients with compatible donors quickly.
              </motion.p>

             
            </div>

            <div className="image-side">
              <div className="image-frame">
                <motion.img initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} src={savedonate} alt="Blood" />
              </div>
            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section className="wave-process">
          <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.8,type:"spring"}} viewport={{once:true}}>How It Works</motion.h2>

          <div className="wave-container">

            <motion.div  initial={{opacity:0,scale:0.6}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} className="wave-step">
              <div className="step-circle">1</div>
              <h4>Submit Request</h4>
              <p>Enter patient and hospital details.</p>
            </motion.div>

            <div className="wave-line"></div>

            <motion.div initial={{opacity:0,scale:0.6}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} className="wave-step">
              <div className="step-circle">2</div>
              <h4>Notify Donors</h4>
              <p>Nearby donors get alerts instantly.</p>
            </motion.div>

            <div className="wave-line"></div>

            <motion.div initial={{opacity:0,scale:0.6}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} className="wave-step">
              <div className="step-circle">3</div>
              <h4>Receive Help</h4>
              <p>Donors reach hospital quickly.</p>
            </motion.div>

          </div>
        </section>

        {/* CTA */}
        <motion.section initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} className="creative-cta">
          <div className="cta-glass">
            <h3>Need Immediate Help?</h3>
            <p>Our support team is available 24/7.</p>

            <div className="cta-actions">
                <button
                  className="primary-btn-new"
                  onClick={() => navigate("/donate")}
                >
                  Become Donor
                </button>
            </div>
          </div>
        </motion.section>

      </div>

      <Footer />
    </>
  );
};

export default BloodRequest;