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
const [activeType, setActiveType] = useState(null);


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

 Contact: ${person.phone}
 Address: ${person.address}

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
    const requestId = sessionStorage.getItem("requestId");

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
  
const toggleMenu = (index, type) => {
  if (activeIndex === index && activeType === type) {
    setActiveIndex(null);
    setActiveType(null);
  } else {
    setActiveIndex(index);
    setActiveType(type);
  }
};



  /* ================= CARD ================= */

 const renderCard = (person, i, type) => (
  <div className="card" key={i}>
   
   <div className="card-info">
  <b>{person.name}</b>
  {person.bloodGroup && <span>({person.bloodGroup})</span>}
  <p>{person.email}</p>
  <p>{person.phone}</p>
  <p>{person.address}</p>
</div>

    <div className="action-container">
  <div className="button-group">
    <button
      className={`connect-btn ${activeIndex === i && activeType === type ? "active" : ""}`}
      onClick={() => toggleMenu(i, type)}
    >
      🔗 Connect
    </button>

    {type !== "donor" && (
      <button
        className="request-btn"
        onClick={() => handleRequest(person, type)}
      >
        ⚡ Request
      </button>
    )}
  </div>

  {activeIndex === i && activeType === type && (
    <div className="contact-panel">
      <button
        className="contact-card whatsapp"
        onClick={() => handleWhatsApp(person)}
      >
        <span className="contact-icon">💬</span>
        <div>
          <h4>WhatsApp</h4>
          <p>Chat instantly with {person.name}</p>
        </div>
      </button>

      <button
        className="contact-card email"
        onClick={() => handleEmail(person)}
      >
        <span className="contact-icon">📧</span>
        <div>
          <h4>Email</h4>
          <p>Send a blood request email</p>
        </div>
      </button>
    </div>
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