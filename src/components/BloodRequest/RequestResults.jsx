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

  const handleRequest = async (person, type) => {
  try {
    // ✅ GET SAME USER REQUEST ID
    const requestId = localStorage.getItem("requestId");

    if (!requestId || requestId === "undefined") {
      alert("❌ Please submit blood request first");
      return;
    }

    // ✅ SEND TO HOSPITAL
    if (type === "hospital") {
      await fetch("https://localhost:7156/api/BloodRequest/sendToHospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          requestId: Number(requestId),
          hospitalName: person.name
        })
      });
    }

    // ✅ SEND TO BLOODBANK
    if (type === "bloodbank") {
      await fetch("https://localhost:7156/api/BloodRequest/sendToBloodBank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          requestId: parseInt(requestId),
          bloodBankName: person.name
        })
      });
    }

    alert("✅ Request sent successfully!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to send request");
  }
};
  
  const toggleMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  /* ================= CARD ================= */

 const renderCard = (person, i, type) => (
  <div className="card" key={i}>
    <div>
      <b>{person.name}</b> ({person.bloodGroup || ""})
      <p>{person.email}</p>
      <p>{person.phone}</p>
      <p>{person.address}</p>
    </div>

    <div className="action-container">

      {/* 🔵 CONNECT BUTTON (ALL) */}
      <button  className="connect-btn" onClick={() => toggleMenu(i)}>
        🔗 Connect
      </button>

      {/* Dropdown */}
      {activeIndex === i && (
        <div className="action-menu">
          <button onClick={() => handleWhatsApp(person)}>💬 WhatsApp</button>
          <button onClick={() => handleEmail(person)}>📧 Email</button>
        </div>
      )}

      {/* 🔴 REQUEST BUTTON (ONLY HOSPITAL & BLOODBANK) */}
      {type !== "donor" && (
        <button
          className="request-btn"
          onClick={() => handleRequest(person, type)}
        >
          ⚡ Request
        </button>
      )}

    </div>
  </div>
);
  return (
    <div className="results-page">

      <h2>🩸 Results in {city}</h2>

      <h3>Donors</h3>
      {data.donors.map((d, i) => renderCard(d, i, "donor"))}

      <h3>Hospitals</h3>
      {data.hospitals.map((h, i) => renderCard(h, i, "hospital"))}

      <h3>Blood Banks</h3>
      {data.bloodBanks.map((b, i) => renderCard(b, i, "bloodbank"))}

    </div>
  );
};

export default RequestResults;