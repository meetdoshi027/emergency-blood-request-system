import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const IndRegister = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    dob: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (value.length < 3) error = "Full name must be at least 3 characters";
        break;

      case "username":
        if (!/^[a-zA-Z0-9_]{4,}$/.test(value))
          error = "Username must be 4+ characters";
        break;

      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value))
          error = "Invalid email address";
        break;

      case "password":
        if (
          !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/.test(value)
        )
          error = "Password must be strong (8+ chars)";
        break;

      case "phone":
        if (!/^[6-9]\d{9}$/.test(value))
          error = "Invalid phone number";
        break;

      case "dob":
        if (!value) error = "Date of birth required";
        else {
          const dob = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          if (
            today.getMonth() < dob.getMonth() ||
            (today.getMonth() === dob.getMonth() &&
              today.getDate() < dob.getDate())
          )
            age--;
          if (age < 18) error = "Must be at least 18 years old";
        }
        break;

      case "address":
        if (value.length < 10) error = "Address too short";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isFormValid =
    Object.values(form).every((v) => v !== "") &&
    Object.values(errors).every((e) => !e);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!isFormValid) return;
  //   console.log("Individual Register:", form);
  // };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid) return;

  try {
    const response = await axios.post(
      "https://localhost:7156/api/Auth/register",
      form
    );

    alert(response.data);

    setForm({
      fullName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      bloodGroup: "",
      dob: "",
      address: "",
    });

  } catch (error) {
    if (error.response) {
      alert(error.response.data);
    } else {
      alert("Server error. Please try again.");
    }
  }
};


  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Individual Registration</h2>

        <form className="register-form grid" onSubmit={handleSubmit}>
          {[
            ["fullName", "Full Name"],
            ["username", "Username"],
            ["email", "Email Address", "email"],
            ["password", "Password", "password"],
            ["phone", "Phone Number"],
          ].map(([name, placeholder, type = "text"]) => (
            <div key={name}>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
              />
              {errors[name] && (
                <span className="error-text">{errors[name]}</span>
              )}
            </div>
          ))}

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
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

          <div>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} />
            {errors.dob && <span className="error-text">{errors.dob}</span>}
          </div>

          <div className="full-width">
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </div>

          <button disabled={!isFormValid}>Register</button>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default IndRegister;












