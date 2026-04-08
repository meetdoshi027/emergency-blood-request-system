import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";
import savedonate from "../../assets/savedonate.jpeg";
import "./BloodRequest.css";

const BloodRequest = () => {
  const navigate = useNavigate();
  const handleRequestClick = () => {
  const user = localStorage.getItem("user");

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
              <span className="mini-label">Emergency Support System</span>

              <h1>
                Connecting <span>Donors</span><br />
                With <span>Lives in Need</span>
              </h1>

              <p>
                Every second matters in a medical emergency. Instantly connect with
                nearby verified donors.
              </p>

              <div className="hero-stats">
                <span>🩸 10,000+ Donors</span>
                <span>⚡ Fast Response</span>
                <span>🏥 Trusted Hospitals</span>
              </div>

             <button className="blob-btn" onClick={handleRequestClick}>
                      Request Blood Now
              </button>
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
              <h2>Find the Right Donor Faster</h2>
              <p>
                Smart matching connects patients with compatible donors quickly.
              </p>

              <div className="quick-tags">
                <span className="tag urgent">O- Universal</span>
                <span className="tag rare">AB- Rare</span>
                <span className="tag urgent">A+ Demand</span>
              </div>
            </div>

            <div className="image-side">
              <div className="image-frame">
                <img src={savedonate} alt="Blood" />
                <div className="floating-info">Fast Matching</div>
              </div>
            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section className="wave-process">
          <h2>How It Works</h2>

          <div className="wave-container">

            <div className="wave-step">
              <div className="step-circle">1</div>
              <h4>Submit Request</h4>
              <p>Enter patient and hospital details.</p>
            </div>

            <div className="wave-line"></div>

            <div className="wave-step">
              <div className="step-circle">2</div>
              <h4>Notify Donors</h4>
              <p>Nearby donors get alerts instantly.</p>
            </div>

            <div className="wave-line"></div>

            <div className="wave-step">
              <div className="step-circle">3</div>
              <h4>Receive Help</h4>
              <p>Donors reach hospital quickly.</p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="creative-cta">
          <div className="cta-glass">
            <h3>Need Immediate Help?</h3>
            <p>Our support team is available 24/7.</p>

            <div className="cta-actions">
              <button className="outline-btn">Call Emergency</button>
              <span className="divider">or</span>
              <button className="primary-btn-new">Become Donor</button>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default BloodRequest;