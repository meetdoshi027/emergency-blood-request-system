import React, { useState } from "react";
import axios from "axios";
import "./DonorRegister.css";
import Navbar from '../Navbar/Navbar';

const DonorRegister = () => {

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    weight: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    medicalHistory: ""
  });

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "https://localhost:7156/api/Donor/register",
        form
      );

      alert("Donor registered successfully! Waiting for approval.");

      // RESET FORM
      setForm({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        weight: "",
        phone: "",
        email: "",
        city: "",
        address: "",
        medicalHistory: ""
      });

    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="donor-page">

      <div className="donor-header">
        <h1>Become a Life Saver ❤️</h1>
        <p>Register as a blood donor and help save lives</p>
      </div>

      <div className="donor-card">

        <h2>Donor Registration</h2>

        {/* ✅ ADD onSubmit HERE */}
        <form className="donor-form" onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <label>Name</label>
            </div>

            <div className="form-group">
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                />
              <label>Age</label>
            </div>

            <div className="form-group">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                >
                <option value=""></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <label>Gender</label>
            </div>

            <div className="form-group">
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                required
                >
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
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                required
                />
              <label>Weight (kg)</label>
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                />
              <label>Phone Number</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                />
              <label>Email</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                />
              <label>City</label>
            </div>

          </div>

          <div className="form-group full">
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              ></textarea>
            <label>Address</label>
          </div>

          <div className="form-group full">
            <input
              type="text"
              name="medicalHistory"
              value={form.medicalHistory}
              onChange={handleChange}
              />
            <label>Medical History (If any)</label>
          </div>

          <button type="submit" className="register-btn">
            Register as Donor
          </button>

        </form>

      </div>
    </div>
              </>
  );
};

export default DonorRegister;