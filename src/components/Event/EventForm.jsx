import React, { useState } from "react";
import axios from "axios";
import "./EventForm.css";

const EventForm = ({ event, closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    agree: false
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      const payload = {
        eventName: event?.title || "",
        organizationName: event?.organization || "",
        eventDate: event?.date,
        name: formData.name,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      };

      const res = await axios.post(
        "https://localhost:7156/api/EventRegistration",
        payload
      );

      alert(res.data.message || "Registration Successful ✅");

      setFormData({
        name: "",
        phone: "",
        gender: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        agree: false
      });

      closeForm();
    } catch (err) {
      console.error(err);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>Register for Event</h2>

        <p><b>{event?.title}</b></p>
        <p>{formatDate(event?.date)}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={event?.title || ""}
            readOnly
            className="readonly-field"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            name="dob"
            required
            value={formData.dob}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            required
            value={formData.state}
            onChange={handleChange}
          />

          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            required
            value={formData.pincode}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>I agree to Terms & Conditions</span>
          </label>

          <button
            type="submit"
            className="submit-btn"
            disabled={!formData.agree}
          >
            Register
          </button>

          <button
            type="button"
            className="close-btn"
            onClick={closeForm}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;