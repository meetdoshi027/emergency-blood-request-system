import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import "./HospitalRequestResults.css";

const HospitalRequestResults = () => {

  const { city, bloodGroup } = useParams();

  // ✅ FIXED (useMemo prevents re-creation)
  const hospital = useMemo(() => {
    return JSON.parse(localStorage.getItem("orgData")) || {};
  }, []);

  const [data, setData] = useState({
    donors: [],
    hospitals: [],
    bloodBanks: []
  });

  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ FETCH DATA (NO WARNING NOW)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://localhost:7156/api/BloodRequest/search?city=${encodeURIComponent(city)}&bloodGroup=${encodeURIComponent(bloodGroup)}`
        );

        if (!res.ok) throw new Error("Failed");

        const result = await res.json();

        setData({
          donors: result.donors || [],
          hospitals: (result.hospitals || []).filter(
            h => h.name !== hospital?.hospitalName
          ),
          bloodBanks: result.bloodBanks || []
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [city, bloodGroup, hospital]); // ✅ SAFE NOW

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

  // ✅ SEND REQUEST
  const handleRequest = async (person, type) => {
    try {
      const requestId = localStorage.getItem("hospitalRequestId");

      if (!requestId || requestId === "undefined") {
        alert("❌ Submit request first");
        return;
      }

      const url =
        type === "hospital"
          ? "https://localhost:7156/api/HospitalBloodRequest/sendToHospital"
          : "https://localhost:7156/api/HospitalBloodRequest/sendToBloodBank";

      const body =
        type === "hospital"
          ? { requestId: Number(requestId), hospitalName: person.name }
          : { requestId: Number(requestId), bloodBankName: person.name };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Failed");

      alert("✅ Request sent");

    } catch (err) {
      console.error(err);
      alert("❌ Failed");
    }
  };

  // ✅ CARD
  const renderCard = (person, i, type) => (
    <div className="card" key={i}>
      <div>
        <b>{person.name}</b>
        <p>{person.phone}</p>
        <p>{person.address}</p>
      </div>

      <div className="action-container">

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

      <h2>🏥 Results in {city}</h2>

      <h3>Donors</h3>
      {data.donors.map((d, i) => renderCard(d, i, "donor"))}

      <h3>Hospitals</h3>
      {data.hospitals.map((h, i) => renderCard(h, i, "hospital"))}

      <h3>Blood Banks</h3>
      {data.bloodBanks.map((b, i) => renderCard(b, i, "bloodbank"))}

    </div>
  );
};

export default HospitalRequestResults;