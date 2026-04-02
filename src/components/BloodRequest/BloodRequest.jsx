import React, { useState } from "react";
import axios from "axios";
import "./BloodRequest.css";
import Navbar from '../Navbar/Navbar';


const BloodRequest = () => {

  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);

  const [searched, setSearched] = useState(false);

  /* ===============================
     CITY LIST
     =============================== */
  const cities = [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Gandhinagar",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Anand",
    "Navsari",
    "Valsad",
    "Bharuch",
    "Patan",
    "Mehsana",
    "Morbi"
  ];

  /* ===============================
     SEARCH FUNCTION
     =============================== */
  const searchBlood = async () => {

    if (!bloodGroup || !city) {
      alert("Please select blood group and city");
      return;
    }

    try {

      const res = await axios.get(
        `https://localhost:7156/api/BloodRequest/search?bloodGroup=${bloodGroup}&city=${city}`
      );

      setDonors(res.data.donors || []);
      setHospitals(res.data.hospitals || []);
      setBloodBanks(res.data.bloodBanks || []);

      setSearched(true);

    } catch (error) {

      console.error("Blood search error:", error);
      alert("Failed to search blood availability");

    }
  };

  return (
    <>
 <Navbar/>
    <div className="blood-request-page">

      <h1 className="page-title">Find Blood Availability</h1>

      {/* ================= SEARCH BOX ================= */}
      <div className="search-box">

        {/* BLOOD GROUP */}
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        {/* CITY LIST */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          >
          <option value="">Select City</option>

          {cities.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}

        </select>

        {/* SEARCH BUTTON */}
        <button onClick={searchBlood}>
          Search
        </button>

      </div>

      {/* ================= RESULTS ================= */}
      {searched && (

        <div className="results-container">

          {/* ================= DONORS ================= */}
          <section>

            <h2>Available Donors</h2>

            {donors.length === 0 && <p>No donors found</p>}

            <div className="cards">
              {donors.map((d) => (
                <div className="card" key={d.userID}>

                  <h3>{d.fullName}</h3>

                  <p>
                    <strong>Blood Group:</strong> {d.bloodGroup}
                  </p>

                  <p>
                    <strong>City:</strong> {d.address}
                  </p>

                  <p>
                    <strong>Phone:</strong> {d.phone}
                  </p>

                </div>
              ))}
            </div>

          </section>


          {/* ================= HOSPITALS ================= */}
          <section>

            <h2>Hospitals</h2>

            {hospitals.length === 0 && <p>No hospitals found</p>}

            <div className="cards">
              {hospitals.map((h) => (
                <div className="card" key={h.hospitalID}>

                  <h3>{h.hospitalName}</h3>

                  <p>
                    <strong>City:</strong> {h.city}
                  </p>

                  <p>
                    <strong>Phone:</strong> {h.phone}
                  </p>

                </div>
              ))}
            </div>

          </section>


          {/* ================= BLOOD BANKS ================= */}
          <section>

            <h2>Blood Banks</h2>

            {bloodBanks.length === 0 && <p>No blood banks found</p>}

            <div className="cards">
              {bloodBanks.map((b) => (
                <div className="card" key={b.bloodBankID}>

                  <h3>{b.bankName}</h3>

                  <p>
                    <strong>City:</strong> {b.city}
                  </p>

                  <p>
                    <strong>Phone:</strong> {b.phone}
                  </p>

                </div>
              ))}
            </div>

          </section>

        </div>

      )}

    </div>
</>
  );
};

export default BloodRequest;