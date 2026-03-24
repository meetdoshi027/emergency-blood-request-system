import React from "react";
import "./DonorRegister.css";

const DonorRegister = () => {
  return (
    <div className="donor-page">

      {/* HEADER */}
      <div className="donor-header">
        <h1>Become a Life Saver ❤️</h1>
        <p>Register as a blood donor and help save lives</p>
      </div>

      {/* FORM CARD */}
      <div className="donor-card">

        <h2>Donor Registration</h2>

        <form className="donor-form">

          <div className="form-grid">

            <div className="form-group">
              <input type="text" required />
              <label>Name</label>
            </div>

            <div className="form-group">
              <input type="number" required />
              <label>Age</label>
            </div>

            <div className="form-group">
              <select required>
                <option value=""></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <label>Gender</label>
            </div>

            <div className="form-group">
              <select required>
                <option value=""></option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
              <label>Blood Group</label>
            </div>

            <div className="form-group">
              <input type="number" required />
              <label>Weight (kg)</label>
            </div>

            <div className="form-group">
              <input type="tel" required />
              <label>Phone Number</label>
            </div>

            <div className="form-group">
              <input type="email" required/>
              <label>Email</label>
            </div>

            <div className="form-group">
              <input type="text" required />
              <label>City</label>
            </div>

          </div>

          <div className="form-group full">
            <textarea required></textarea>
            <label>Address</label>
          </div>

          <div className="form-group full">
            <input type="text" required/>
            <label>Medical History(If have Any)</label>
          </div>

          <button className="register-btn">
            Register as Donor
          </button>

        </form>

      </div>

    </div>
  );
};

export default DonorRegister;