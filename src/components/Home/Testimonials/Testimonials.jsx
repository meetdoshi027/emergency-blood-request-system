import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2>Lives Saved Through This Platform</h2>
        <p className="testimonials-subtitle">
          Real people. Real emergencies. Real impact.
        </p>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              “My father needed blood urgently at midnight.  
              Within minutes, we found a donor nearby.  
              This platform truly saves lives.”
            </p>
            <h4>— Ramesh Patel</h4>
            <span>Ahmedabad</span>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              “As a donor, I was notified instantly.  
              I felt proud knowing I could help someone in real need.”
            </p>
            <h4>— Sneha Mehta</h4>
            <span>Blood Donor</span>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-text">
              “Our hospital relies on this system for emergency cases.  
              It is fast, reliable, and extremely well organized.”
            </p>
            <h4>— City Care Hospital</h4>
            <span>Partner Hospital</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
