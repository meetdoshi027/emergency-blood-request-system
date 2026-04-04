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

  useEffect(() => {
    fetch(`https://localhost:7156/api/BloodRequest/search?city=${encodeURIComponent(city)}&bloodGroup=${encodeURIComponent(bloodGroup)}`)
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);
        setData(data);
      });
  }, [city, bloodGroup]);

  /* ================= ACTION HANDLER ================= */
  const handleCall = (phone) => {
  window.open(`tel:${phone}`);
  alert("📞 Opening dialer...");
};

  const handleWhatsApp = (person) => {
    const msg = `Hello ${person.name}, I need ${bloodGroup} blood in ${city}. Please help.`;
    window.open(`https://wa.me/91${person.phone}?text=${encodeURIComponent(msg)}`);
    alert("💬 Opening WhatsApp...");
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
          body: `Hello ${person.name},\n\nUrgent need of ${bloodGroup} blood in ${city}.\nPlease contact urgently.`
        })
      });

      alert("📧 Email sent successfully!");
    } catch {
      alert("❌ Email failed");
    }
  };

  return (
    <div className="results-page">

      <h2>🩸 Results in {city}</h2>

      {/* DONORS */}
      <h3>Donors</h3>
      {data.donors.map((d, i) => (
        <div className="card" key={i}>
          <div>
            <b>{d.name}</b> ({d.bloodGroup})
            <p>{d.email}</p>
            <p>{d.phone}</p>
            <p>{d.address}</p>
          </div>

          <div className="actions">
            <button onClick={() => handleCall(d.phone)}>📞 Call</button>
            <button onClick={() => handleWhatsApp(d)}>💬 WhatsApp</button>
            <button onClick={() => handleEmail(d)}>📧 Email</button>
          </div>
        </div>
      ))}

      {/* HOSPITALS */}
      <h3>Hospitals</h3>
      {data.hospitals.map((h, i) => (
        <div className="card" key={i}>
          <div>
            <b>{h.name}</b>
            <p>{h.phone}</p>
            <p>{h.address}</p>
          </div>

          <div className="actions">
            <button onClick={() => handleCall(h.phone)}>📞 Call</button>
            <button onClick={() => handleWhatsApp(h)}>💬 WhatsApp</button>
            <button onClick={() => handleEmail(h)}>📧 Email</button>
          </div>
        </div>
      ))}

      {/* BLOOD BANKS */}
      <h3>Blood Banks</h3>
      {data.bloodBanks.map((b, i) => (
        <div className="card" key={i}>
          <div>
            <b>{b.name}</b>
            <p>{b.phone}</p>
            <p>{b.address}</p>
          </div>

          <div className="actions">
            <button onClick={() => handleCall(b.phone)}>📞 Call</button>
            <button onClick={() => handleWhatsApp(b)}>💬 WhatsApp</button>
            <button onClick={() => handleEmail(b)}>📧 Email</button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default RequestResults;