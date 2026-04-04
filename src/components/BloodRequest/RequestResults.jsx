import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RequestResults.css";

const RequestResults = () => {

  const { city, bloodGroup } = useParams();

  const [data, setData] = useState({
    donors: [],
    hospitals: [],
    bloodBanks: []
  });

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7156/api/BloodRequest/search?city=${encodeURIComponent(city)}&bloodGroup=${encodeURIComponent(bloodGroup)}`)
      .then(res => res.json())
      .then(data => {
        setData({
          donors: data.donors || [],
          hospitals: data.hospitals || [],
          bloodBanks: data.bloodBanks || []
        });
      });
  }, [city, bloodGroup]);

  /* ================= ACTIONS ================= */

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleWhatsApp = (person) => {
    const msg = `Hello ${person.name},

I need ${bloodGroup} blood in ${city}.

📞 Contact: ${person.phone}
📍 Address: ${person.address}

Please help urgently.`;

    window.open(`https://wa.me/91${person.phone}?text=${encodeURIComponent(msg)}`);
  };

  const handleEmail = async (person) => {
    try {
      await fetch("https://localhost:7156/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          toEmail: person.email,
          subject: "🚑 Blood Request",
          body: `Hello ${person.name},

I need ${bloodGroup} blood in ${city}.

📞 Contact: ${person.phone}
📍 Address: ${person.address}

Please respond urgently.`
        })
      });

      alert("📧 Email sent!");
    } catch {
      alert("❌ Email failed");
    }
  };

  const toggleMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  /* ================= CARD ================= */

  const renderCard = (person, i) => (
    <div className="card" key={i}>
      <div>
        <b>{person.name}</b> ({person.bloodGroup || ""})
        <p>{person.email}</p>
        <p>{person.phone}</p>
        <p>{person.address}</p>
      </div>

      <div className="action-container">
        <button className="request-btn" onClick={() => toggleMenu(i)}>
          ⚡ Request
        </button>

        {activeIndex === i && (
          <div className="action-menu">
            <button onClick={() => handleCall(person.phone)}>📞 Call</button>
            <button onClick={() => handleWhatsApp(person)}>💬 WhatsApp</button>
            <button onClick={() => handleEmail(person)}>📧 Email</button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="results-page">

      <h2>🩸 Results in {city}</h2>

      <h3>Donors</h3>
      {data.donors.map(renderCard)}

      <h3>Hospitals</h3>
      {data.hospitals.map(renderCard)}

      <h3>Blood Banks</h3>
      {data.bloodBanks.map(renderCard)}

    </div>
  );
};

export default RequestResults;