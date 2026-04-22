import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./BloodBankRequestResults.css";

const BloodBankRequestResults = () => {
  const { city, bloodGroup } = useParams();

  // Logged in blood bank data
  const bloodbank = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("bloodBankData")) || {};
  }, []);

  const [data, setData] = useState({
    donors: [],
    hospitals: [],
    bloodBanks: []
  });

  const [activeIndex, setActiveIndex] = useState(null);
const [activeType, setActiveType] = useState(null);


  // FETCH SEARCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Blood Bank Data:", bloodbank);

        const res = await fetch(
          `https://localhost:7156/api/BloodRequest/search?city=${encodeURIComponent(
            city
          )}&bloodGroup=${encodeURIComponent(bloodGroup)}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();

        setData({
          donors: result.donors || [],
          hospitals: result.hospitals || [],

          // Hide logged in blood bank from list
          bloodBanks: (result.bloodBanks || []).filter(
            (b) =>
              b.name?.toLowerCase() !==
              bloodbank?.bankName?.toLowerCase()
          )
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [city, bloodGroup, bloodbank]);

  // WHATSAPP
  const handleWhatsApp = (person) => {
    const msg = `Hello ${person.name},

I need ${bloodGroup} blood in ${city}.

📞 Contact: ${person.phone}
📍 Address: ${person.address}

Please help urgently.`;

    window.open(
      `https://wa.me/91${person.phone}?text=${encodeURIComponent(msg)}`
    );
  };

  // EMAIL
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

  // TOGGLE CONNECT MENU
  const toggleMenu = (index, type) => {
  if (activeIndex === index && activeType === type) {
    setActiveIndex(null);
    setActiveType(null);
  } else {
    setActiveIndex(index);
    setActiveType(type);
  }
};


  // SEND REQUEST
  const handleRequest = async (person, type) => {
    try {
      const requestId = sessionStorage.getItem("bloodBankRequestId");

      console.log("RequestId:", requestId);
      console.log("Person:", person);
      console.log("Type:", type);

      if (
        !requestId ||
        requestId === "undefined" ||
        requestId === "null"
      ) {
        alert("❌ Submit request first");
        return;
      }

      const url =
        type === "hospital"
          ? "https://localhost:7156/api/BloodBankBloodRequest/sendToHospital"
          : "https://localhost:7156/api/BloodBankBloodRequest/sendToBloodBank";

      const body =
        type === "hospital"
          ? {
              requestId: Number(requestId),
              hospitalName: person.name
            }
          : {
              requestId: Number(requestId),
              bloodBankName: person.name
            };

      console.log("Sending Body:", body);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("bloodBankToken")}`
        },
        body: JSON.stringify(body)
      });

      const responseText = await res.text();
      console.log("Response:", responseText);

      if (!res.ok) {
        alert(responseText);
        return;
      }

      alert("✅ Request sent successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send request");
    }
  };

  // CARD UI
  const renderCard = (person, i, type) => (
    <div className="card" key={i}>
      <div>
        <b>{person.name}</b>
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

export default BloodBankRequestResults;