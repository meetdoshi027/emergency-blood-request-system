import React from "react";
import donorboy from "../../assets/donorboy.png";
import savedonate from "../../assets/savedonate.jpeg";
import process1 from "../../assets/donationprocess1.png";
import process2 from "../../assets/donationprocess2.png";
import process3 from "../../assets/donationprocess3.png";
import process4 from "../../assets/donationprocess4.png";
import eligibility from "../../assets/eligibility.png"
import { useNavigate } from "react-router-dom";
import "./Donate.css";


const Donate = () => {
const navigate = useNavigate();
  return (
    <div className="donate-page">

      {/* HERO */}
      <section className="donate-hero">
        <div className="hero-text">
          <h1>Become a Blood Hero</h1>
          <p>Save lives with your blood donation</p>
          <button className="primary-btn" onClick={()=> navigate("/DonorRegister")}>Register as Donor</button>
        </div>

        <div className="hero-image">
          <img src={donorboy} alt="Blood Donor" />
        </div>
      </section>

      {/* WHY DONATE */}
      <section className="why-donate">
        <h2>Why Be a Blood Donor?</h2>

        <div className="why-cards">
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
        </div>
      </section>

      {/* BLOOD TYPES */}
      <section className="blood-types">
        <h2>Who Can You Save?</h2>
        <img src={savedonate} alt="Blood Compatibility" />
      </section>

      {/* DONATION PROCESS */}
      <section className="donation-process">
        <h2>Donation Process</h2>

        <div className="process-container">

          {/* STEP 1 */}
          <div className="process-step">
            <img src={process1} alt="Registration" />
            <div className="process-text">
              <h3>Registration</h3>
              <p>
               Begin by registering yourself as a blood donor through our platform.
               You will provide basic information such as your name, age, contact
               details, and blood group. This helps us maintain a reliable database
               of donors who are willing to help in emergencies. The process is quick,
               simple, and ensures that patients can easily find donors when needed.
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="process-step reverse">
            <img src={process2} alt="Health Check" />
            <div className="process-text">
              <h3>Health Check</h3>
              <p>
                Before donating blood, a quick health screening is conducted by
                medical professionals. Your blood pressure, hemoglobin level,
                temperature, and overall health condition are checked to ensure
                that donating blood is safe for you. This step protects both the
                donor and the recipient by ensuring the blood is healthy and safe.
              </p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="process-step">
            <img src={process3} alt="Blood Donation" />
            <div className="process-text">
              <h3>Blood Donation</h3>
              <p>
               Once the health check is complete, the blood donation process begins.
               A sterile needle is used to collect blood in a safe and hygienic
               environment. The actual donation usually takes around 8–10 minutes
               and is completely painless for most donors. Your donated blood can
               help save multiple lives in hospitals and emergency situations.
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="process-step reverse">
            <img src={process4} alt="Refreshment" />
            <div className="process-text">
              <h3>Rest & Refreshment</h3>
              <p>
                After donating blood, donors are asked to relax for a few minutes.
                Light refreshments such as juice and snacks are provided to help
                restore energy levels. Medical staff will ensure you feel comfortable
                before leaving the donation area. Taking a short rest ensures a safe
                and smooth recovery after the donation process.
              </p>
            </div>
          </div>

        </div>
      </section>

  
     {/* ELIGIBILITY */}
<section className="eligibility">

  <div className="eligibility-container">

    {/* LEFT SIDE */}
    <div className="eligibility-left">
      <h2>Eligibility Guidelines</h2>

      <div className="eligibility-card">
        <ul>
          <li>Age: 18–65 years</li>
          <li>Weight: 50kg+</li>
          <li>Healthy & feeling well</li>
          <li>No recent illness or surgery</li>
        </ul>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="eligibility-right">
      <img src={eligibility} alt="Eligibility Illustration"/>
    </div>

  </div>

</section>
    </div>
  );
};

export default Donate;