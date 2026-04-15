import React, { useEffect, useState } from 'react';
import './Aboutus.css'
import aboutImg from '../../assets/whoarewe.png'
import team from '../../assets/teammember.jpg'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/footer';

const Aboutus = () => {

   const [stats, setStats] = useState({
    hospitals: 0,
    bloodBanks: 0,
    donors: 0,
    requests: 0
  });

  // 🔥 FETCH DATA FROM STATS API
  useEffect(() => {

    const fetchStats = () => {
      axios.get("https://localhost:7156/api/stats")
        .then(res => {
          setStats(res.data);
        })
        .catch(err => {
          console.error("Error fetching stats:", err);
        });
    };

    fetchStats(); // initial load

    // 🔥 AUTO UPDATE EVERY 3 SEC
    const interval = setInterval(fetchStats, 3000);

    return () => clearInterval(interval);

  }, []);


  return (
    <>
    <Navbar/>
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
           anytime, anywhere.
        </p>
      </div>

      {/* Count Up Section */}
      <div className="count-section">

          <div className="count-card">
            <h2>{stats.hospitals}</h2>
            <p>Partner Hospitals</p>
          </div>

          <div className="count-card">
            <h2>{stats.bloodBanks}</h2>
            <p>Partner Blood Banks</p>
          </div>

          <div className="count-card">
            <h2>{stats.donors}</h2>
            <p>Registered Donors</p>
          </div>

          <div className="count-card">
            <h2>{stats.requests}</h2>
            <p>Lives Saved</p>
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
    <Footer/>
    </>
  )
}

export default Aboutus
