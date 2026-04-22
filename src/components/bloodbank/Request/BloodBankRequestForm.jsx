import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodBankRequestForm.css";

const BloodBankRequestForm = () => {

  const navigate = useNavigate();
  const bloodbank = JSON.parse(sessionStorage.getItem("bloodBankData")) || {};

  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "",
    city: "",
    state: "",
    contact: "",
    urgency: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://localhost:7156/api/BloodBankBloodRequest/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("bloodBankToken")}`
        },
        body: JSON.stringify({
          ...formData,
          bloodBankName: bloodbank?.bankName
        })
      });

      const data = await res.json();

      sessionStorage.setItem("bloodBankRequestId", data.requestId);

      alert("✅ Request Submitted");

      navigate(`/bloodbank/results/${formData.city}/${formData.bloodGroup}`);

    } catch (err) {
      console.error(err);
      alert("❌ Failed");
    }
  };

  return (
    <div className="request-page">

      <div className="request-container">

        <h2>🩸 Blood Bank Blood Request</h2>
        <p className="subtitle">Fill details to request blood quickly</p>

        <form onSubmit={handleSubmit}>

          {/* BLOOD SECTION */}
          <h4>🩸 Blood Requirement</h4>
          <div className="form-row">
            <select name="bloodGroup" required onChange={handleChange}>
              <option value="">Select Blood Group</option>
              <option>O+</option><option>O-</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
            </select>

            <input
              type="number"
              name="units"
              placeholder="Units Required"
              required
              onChange={handleChange}
            />
          </div>

          {/* LOCATION */}
          <h4>📍 Location</h4>
          <div className="form-row">
            <input name="city" placeholder="City" required onChange={handleChange} />
            <input name="state" placeholder="State" required onChange={handleChange} />
          </div>

          {/* CONTACT */}
          <h4>📞 Contact Details</h4>
          <input name="contact" placeholder="Phone Number" required onChange={handleChange} />

          {/* URGENCY */}
          <select name="urgency" required onChange={handleChange}>
            <option value="">Select Urgency</option>
            <option>Normal</option>
            <option>Urgent</option>
          </select>

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Additional Notes (optional)"
            onChange={handleChange}
          />

          {/* BUTTONS */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">🚑 Submit Request</button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BloodBankRequestForm;