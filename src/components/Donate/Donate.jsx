import React from "react";
import donorboy from "../../assets/donorboy.png";
import savedonate from "../../assets/savedonate.jpeg";
import process1 from "../../assets/donationprocess1.png";
import process2 from "../../assets/donationprocess2.png";
import process3 from "../../assets/donationprocess3.png";
import process4 from "../../assets/donationprocess4.png";
import eligibility from "../../assets/eligibility.png"
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { motion } from "framer-motion";
import Footer from '../footer/footer';
import "./Donate.css";


const Donate = () => {
const navigate = useNavigate();

const handleDonorClick = () => {
  const user = sessionStorage.getItem("user");

  if (!user) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  navigate("/donorregister");
};
  return (
    <>
    <Navbar/>  
    <div className="donate-page">

      {/* HERO */}
      <section className="donate-hero">
        <div className="hero-text">
          <motion.h1 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Become a Blood Hero</motion.h1>
          <motion.p initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}}>Save lives with your blood donation</motion.p>
          <motion.button initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} className="primary-btn" onClick={handleDonorClick}>
                   Register as Donor
          </motion.button>
        </div>

        <div className="hero-image">
          <motion.img initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:1.3,type:"spring"}} viewport={{once:true}} src={donorboy} alt="Blood Donor" />
        </div>
      </section>

      {/* WHY DONATE */}
      <section className="why-donate">
        <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}} >Why Be a Blood Donor?</motion.h2>

        <motion.div initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} className="why-cards">
          <div className="card">
            ❤️
            <h4>Save Lives</h4>
            <p>Help save up to 3 lives</p>
          </div>

          <div className="card">
            ⏱️
            <h4>Quick & Simple</h4>
            <p>Takes less than an hour</p>
          </div>

          <div className="card">
            💉
            <h4>Health Benefits</h4>
            <p>Improves blood circulation</p>
          </div>

          <div className="card">
            😊
            <h4>Feel Good</h4>
            <p>Make a real difference</p>
          </div>
        </motion.div>
      </section>

      {/* BLOOD TYPES */}
      <section className="blood-types">
        <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}} >Who Can You Save?</motion.h2>
        <motion.img initial={{opacity:0,scale:0.8}} whileInView={{opacity:1,scale:1}} transition={{delay:1,type:"spring"}} viewport={{once:"true"}} src={savedonate} alt="Blood Compatibility" />
      </section>

      {/* DONATION PROCESS */}
      <section className="donation-process">
        <motion.h2 initial={{opacity:0,y:-100}} whileInView={{opacity:1,y:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}}>Donation Process</motion.h2>

        <div className="process-container">

          {/* STEP 1 */}
          <div className="process-step">
            <motion.img initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.8,type:"spring"}} viewport={{once:true}} src={process1} alt="Registration" />
            <div className="process-text">
              <motion.h3 initial={{opacity:0,y:100}} whileInView={{opacity:1,y:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Registration</motion.h3>
              <motion.p initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}}>
               Begin by registering yourself as a blood donor through our platform.
               You will provide basic information such as your name, age, contact
               details, and blood group. This helps us maintain a reliable database
               of donors who are willing to help in emergencies. The process is quick,
               simple, and ensures that patients can easily find donors when needed.
              </motion.p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="process-step reverse">
            <motion.img initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}} src={process2} alt="Health Check" />
            <div className="process-text">
              <motion.h3 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Health Check</motion.h3>
              <motion.p initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}}>
                Before donating blood, a quick health screening is conducted by
                medical professionals. Your blood pressure, hemoglobin level,
                temperature, and overall health condition are checked to ensure
                that donating blood is safe for you. This step protects both the
                donor and the recipient by ensuring the blood is healthy and safe.
              </motion.p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="process-step">
            <motion.img initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} src={process3} alt="Blood Donation" />
            <div className="process-text">
              <motion.h3 initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Blood Donation</motion.h3>
              <motion.p initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}}>
               Once the health check is complete, the blood donation process begins.
               A sterile needle is used to collect blood in a safe and hygienic
               environment. The actual donation usually takes around 8–10 minutes
               and is completely painless for most donors. Your donated blood can
               help save multiple lives in hospitals and emergency situations.
              </motion.p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="process-step reverse">
            <motion.img initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} src={process4} alt="Refreshment" />
            <div className="process-text">
              <motion.h3 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Rest & Refreshment</motion.h3>
              <motion.p initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:1.1,type:"spring"}} viewport={{once:true}} >
                After donating blood, donors are asked to relax for a few minutes.
                Light refreshments such as juice and snacks are provided to help
                restore energy levels. Medical staff will ensure you feel comfortable
                before leaving the donation area. Taking a short rest ensures a safe
                and smooth recovery after the donation process.
              </motion.p>
            </div>
          </div>

        </div>
      </section>

  
     {/* ELIGIBILITY */}
<section className="eligibility">

  <div className="eligibility-container">

    {/* LEFT SIDE */}
    <div className="eligibility-left">
      <motion.h2 initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.6,type:"spring"}} viewport={{once:true}}>Eligibility Guidelines</motion.h2>

      <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} className="eligibility-card">
        <ul>
          <li>Age: 18–65 years</li>
          <li>Weight: 50kg+</li>
          <li>Healthy & feeling well</li>
          <li>No recent illness or surgery</li>
        </ul>
      </motion.div>
    </div>

    {/* RIGHT SIDE */}
    <div className="eligibility-right">
      <motion.img initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.9,type:"spring"}} viewport={{once:true}} src={eligibility} alt="Eligibility Illustration"/>
    </div>

  </div>

</section>
    </div>
    <Footer/>
    </>
  );
};

export default Donate;