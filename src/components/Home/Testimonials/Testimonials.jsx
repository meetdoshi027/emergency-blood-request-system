import React, { useState } from "react";
import persons from "../../../assets/teammember.jpg";
import "./Testimonials.css";

const data = [
   {
    text: "When my brother needed blood urgently after an accident, we were helpless.Within minutes, this platform connected us with a donor nearby.It truly saved his life and gave us hope in a critical moment.",
    name: "Amit Shah",
  },
  {
    text: "I signed up as a donor just to help others in need.One day I received an emergency request and immediately responded.It feels incredibly fulfilling to be part of saving someone’s life.",
    name: "Neha Verma",
  },
  {
    text: "Our hospital regularly faces emergency blood requirements.This platform helps us find donors quickly without delays.It has become a reliable support system for critical cases.",
    name: "Lifeline Hospital",
  },
   {
    text: "We were searching everywhere for blood late at night.This platform connected us to a donor in less than 20 minutes.I’m truly grateful for such a fast and life-saving service.",
    name: "Rajesh Kumar",
  },
   {
    text: "The instant notification feature works perfectly in emergencies.Donors are alerted quickly, which saves precious time.This initiative is making a real difference in people’s lives.",
    name: "Priya Mehta",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(index === 0 ? data.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === data.length - 1 ? 0 : index + 1);
  };

  return (
    <section className="testimonial-section">
      <h2>Lives Saved Through This Platform</h2>

      <div className="testimonial-box">
        <div className="avatar">
          <img src={persons} className="person" alt="Team Member" />
        </div>

        <div className="content">
          <div className="stars">★★★★★</div>

          <p>"{data[index].text}"</p>

          <h4>{data[index].name}</h4>

          <div className="dots">
            {data.map((_, i) => (
              <span key={i} className={i === index ? "active" : ""}></span>
            ))}
          </div>
        </div>

        <div className="controls">
          <button onClick={prevSlide}>‹</button>
          <button onClick={nextSlide}>›</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;