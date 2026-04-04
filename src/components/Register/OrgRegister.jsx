import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/footer';

const OrgRegister = () => {

  const [form, setForm] = useState({
    organizationName: "",
    orgType: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    address: "",
    registrationNumber: "",
    licenseNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {

      case "organizationName":
        return value.length < 3 ? "Organization name is too short" : "";

      case "username":
        return !/^[a-zA-Z0-9_]{4,}$/.test(value)
          ? "Min 4 characters required"
          : "";

      case "email":
        return !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email address"
          : "";

      case "password":
        return value.length < 8
          ? "Password must be at least 8 characters"
          : "";

      case "phone":
        return !/^[6-9]\d{9}$/.test(value)
          ? "Invalid phone number"
          : "";

      case "registrationNumber":
        return form.orgType === "Hospital" && !value
          ? "Hospital registration number required"
          : "";

      case "licenseNumber":
        return form.orgType === "BloodBank" && !value
          ? "Blood bank license number required"
          : "";

      case "address":
        return value.length < 10
          ? "Address must be at least 10 characters"
          : "";

      case "orgType":
        return value ? "" : "Select organization type";

      case "city":
        return value ? "" : "Enter city";   // ✅ changed

      default:
        return "";
    }
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value)
    }));
  };

  const isFormValid =
    Object.values(errors).every((e) => e === "") &&
    form.organizationName &&
    form.username &&
    form.email &&
    form.password &&
    form.phone &&
    form.city &&
    form.address &&
    form.orgType &&
    (form.orgType === "Hospital"
      ? form.registrationNumber
      : form.licenseNumber);

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!isFormValid) return;

    try {

      const response = await axios.post(
        "https://localhost:7156/api/Organization/register",
        {
          organizationType: form.orgType,
          name: form.organizationName,
          email: form.email,
          username: form.username,
          password: form.password,
          phone: form.phone,
          address: form.address,
          city: form.city,
          registrationNumber: form.registrationNumber,
          licenseNumber: form.licenseNumber,
        }
      );

      alert(response.data.message);

      setForm({
        organizationName: "",
        orgType: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        address: "",
        registrationNumber: "",
        licenseNumber: "",
      });

    } catch (error) {

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
      }

    }
  };

  return (
    <>
    <Navbar/>
    <div className="register-page">
      <div className="register-container">

        <h2>Organization Registration</h2>

        <form className="register-form grid" onSubmit={handleSubmit}>

          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            value={form.organizationName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          {/* ✅ CITY INPUT (REPLACED DROPDOWN) */}
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={form.city}
            onChange={handleChange}
          />

          {/* Organization Type */}
          <div className="org-type full-width">
            <p className="section-label">Organization Type</p>

            <div className="radio-cards">

              <label className={form.orgType === "BloodBank" ? "active" : ""}>
                <input
                  type="radio"
                  name="orgType"
                  value="BloodBank"
                  checked={form.orgType === "BloodBank"}
                  onChange={handleChange}
                />
                🩸 Blood Bank
              </label>

              <label className={form.orgType === "Hospital" ? "active" : ""}>
                <input
                  type="radio"
                  name="orgType"
                  value="Hospital"
                  checked={form.orgType === "Hospital"}
                  onChange={handleChange}
                />
                🏥 Hospital
              </label>

            </div>
          </div>

          {form.orgType === "Hospital" && (
            <input
              type="text"
              name="registrationNumber"
              placeholder="Hospital Registration Number"
              value={form.registrationNumber}
              onChange={handleChange}
            />
          )}

          {form.orgType === "BloodBank" && (
            <input
              type="text"
              name="licenseNumber"
              placeholder="Blood Bank License Number"
              value={form.licenseNumber}
              onChange={handleChange}
            />
          )}

          <textarea
            name="address"
            placeholder="Organization Address"
            value={form.address}
            onChange={handleChange}
          />

          <button type="submit" disabled={!isFormValid}>
            Register Organization
          </button>

        </form>

        <div className="register-footer">
          Already have an account?{" "}
          <Link to="/login" state={{ loginType: "organization" }}>
            Login here
          </Link>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default OrgRegister;