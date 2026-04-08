import React, { useState } from 'react';
import './Contactform.css';
import axios from "axios";

const Contactform = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    queryText: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    else if (!nameRegex.test(formData.fullName))
      newErrors.fullName = 'Only letters allowed';

    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!emailRegex.test(formData.email))
      newErrors.email = 'Invalid email';

    if (!formData.queryText.trim())
      newErrors.queryText = 'Query is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("https://localhost:7156/api/contact/add", formData);

      alert("Query Sent Successfully!");

      setFormData({
        fullName: '',
        email: '',
        queryText: ''
      });

    } catch {
      alert("Failed to send query");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">

         <div className="contact-info">
          <h2>Get in Touch</h2>

          <div className="contact-top">
            <div className="info-card">
              <h4>Sales Team</h4>
              <p>📞 +91 9913723476</p>
              <p>✉️ meet@gmail.com</p>
            </div>

            <div className="info-card">
              <h4>HR</h4>
              <p>📞 +91 9978777693</p>
              <p>✉️ hr@successinfotech.co.in</p>
            </div>
          </div>

          <div className="contact-bottom">
            <div className="info-card">
              <h4>Other Query</h4>
              <p>📞 +91 9099383095</p>
              <p>✉️ info@successinfotech.co.in</p>
            </div>
          </div>
        </div>

        <div className="contact-form-box">
          <h2>Send Query</h2>

          <form onSubmit={handleSubmit}>

            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}

            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <textarea
              name="queryText"
              placeholder="Enter your query..."
              value={formData.queryText}
              onChange={handleChange}
            />
            {errors.queryText && <span className="error">{errors.queryText}</span>}

            <button type="submit">Send Query</button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Contactform;