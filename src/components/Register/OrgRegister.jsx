import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

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

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
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

      alert(response.data);

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
      alert(
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || "Server error"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Organization Registration</h2>

        <form className="register-form grid" onSubmit={handleSubmit}>
          {[
            ["organizationName", "Organization Name"],
            ["username", "Username"],
            ["email", "Email Address"],
            ["password", "Password"],
            ["phone", "Phone Number"],
            ["city", "City"],
          ].map(([name, placeholder]) => (
            <div key={name}>
              <input
                type={name === "password" ? "password" : "text"}
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

          {/* Hospital Registration Number */}
          {form.orgType === "Hospital" && (
            <div className="full-width">
              <input
                type="text"
                name="registrationNumber"
                placeholder="Hospital Registration Number"
                value={form.registrationNumber}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Blood Bank License Number */}
          {form.orgType === "BloodBank" && (
            <div className="full-width">
              <input
                type="text"
                name="licenseNumber"
                placeholder="Blood Bank License Number"
                value={form.licenseNumber}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="full-width">
            <textarea
              name="address"
              placeholder="Organization Address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

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
  );
};

export default OrgRegister;
