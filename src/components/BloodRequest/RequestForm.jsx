import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/footer";
import "./RequestForm.css";

const RequestForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    city: "",
    state: "",
    contact: "",
    urgency: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("✅ Request Submitted Successfully!");
    console.log(formData);

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="request-page">
        <div className="request-container">

          <h2>🩸 Blood Request Form</h2>
          <p>Please fill accurate details for faster help</p>

          <form onSubmit={handleSubmit}>

            {/* Patient Info */}
            <h4>Patient Details</h4>
            <div className="form-row">
              <input name="patientName" placeholder="Patient Name" required onChange={handleChange} />
              <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
            </div>

            {/* Blood Info */}
            <h4>Blood Requirement</h4>
            <div className="form-row">
              <select name="bloodGroup" required onChange={handleChange}>
                <option value="">Select Blood Group</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>

              <input type="number" name="units" placeholder="Units Required" required onChange={handleChange} />
            </div>

            {/* Hospital */}
            <h4>Hospital Information</h4>
            <input name="hospital" placeholder="Hospital Name" required onChange={handleChange} />

            {/* Location */}
            <h4>Location</h4>
            <div className="form-row">
              <input name="city" placeholder="City" required onChange={handleChange} />
              <input name="state" placeholder="State" required onChange={handleChange} />
            </div>

            {/* Schedule */}
            <h4>Required Time</h4>
            <div className="form-row">
              <input type="date" name="date" required onChange={handleChange} />
              <input type="time" name="time" required onChange={handleChange} />
            </div>

            {/* Contact */}
            <h4>Contact Details</h4>
            <input type="tel" name="contact" placeholder="Phone Number" required onChange={handleChange} />

            {/* Urgency */}
            <select name="urgency" required onChange={handleChange}>
              <option value="">Select Urgency</option>
              <option>Normal</option>
              <option>Urgent</option>
              <option>Critical</option>
            </select>

            {/* Notes */}
            <textarea
              name="message"
              placeholder="Additional Notes (optional)"
              onChange={handleChange}
            />

            {/* Buttons */}
            <div className="form-actions">
              <button type="submit" className="submit-btn">🚑 Submit Request</button>
              <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RequestForm;