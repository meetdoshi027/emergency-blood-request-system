import React from 'react'
import './Aboutus.css'
import aboutImg from '../../assets/whoarewe.png'
import team from '../../assets/teammember.jpg'
import CountUp from 'react-countup'

const Aboutus = () => {
  return (
    <section className="aboutus">
      {/* About Section */}
      <div className="aboutus-container">
        <div className="aboutus-text-section">
          <h2 className="aboutus-title">Who Are We</h2>

          <p className="aboutus-text">
            We are a life-saving digital platform dedicated to connecting blood donors
            with patients in urgent need. Our mission is to make blood availability
            faster, easier, and more reliable during medical emergencies.
          </p>

          <p className="aboutus-text">
            Through real-time blood requests, verified donor networks, and
            location-based matching, we help hospitals, patients, and volunteers
            come together when every second matters.
          </p>

          <p className="aboutus-text">
            Driven by compassion and powered by technology, we believe that no life
            should be lost due to the unavailability of blood.
          </p>
        </div>

        <div className="aboutus-image-section">
          <img src={aboutImg} alt="Blood Donation" />
        </div>
      </div>

      {/* Vision Section */}
      <div className="vision-container">
        <h3 className="vision-title">Our Vision</h3>
        <p className="vision-text">
          To create a world where no patient suffers or loses their life due to
          delayed or unavailable blood supply. We envision a connected ecosystem
          where donors, hospitals, and communities unite seamlessly to save lives
          — anytime, anywhere.
        </p>
      </div>

      {/* Count Up Section */}
      <div className="count-section">
        <div className="count-card">
          <h2><CountUp end={120} duration={5} />+</h2>
          <p>Partner Hospitals</p>
        </div>

        <div className="count-card">
          <h2><CountUp end={8500} duration={7} />+</h2>
          <p>Registered Donors</p>
        </div>

        <div className="count-card">
          <h2><CountUp end={4300} duration={6} />+</h2>
          <p>Lives Saved</p>
        </div>

        <div className="count-card">
          <h2><CountUp end={9800} duration={8} />+</h2>
          <p>Blood Requests</p>
        </div>
      </div>

      <div className="team-section">
        <h3 className="team-title">Our Team</h3>
        <p className="team-subtitle">
          A dedicated group of professionals and volunteers committed to saving lives.
        </p>

        <div className="team-grid">
          <div className="team-card">
            <img src={team} alt="Team Member" />
            <h4>Meet Doshi</h4>
            <span>Medical Advisor</span>
          </div>

          <div className="team-card">
            <img src={team} alt="Team Member" />
            <h4>Harsh Gupta</h4>
            <span>Operations Lead</span>
          </div>

          <div className="team-card">
            <img src={team} alt="Team Member" />
            <h4>Parth Bhatwala</h4>
            <span>Frontend Developer</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
