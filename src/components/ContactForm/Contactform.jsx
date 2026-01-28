import React, { useState } from 'react';
import './Contactform.css';

const Contactform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!nameRegex.test(formData.name.trim()))
      newErrors.name = 'Name must contain only letters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">

        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <div className="contact-form-box">
          <h2>Emergency Blood Request</h2>

          <form onSubmit={handleSubmit} noValidate>
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}

            <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}

            <input name="subject" placeholder="Blood Requirement / Query" value={formData.subject} onChange={handleChange} />
            {errors.subject && <span className="error">{errors.subject}</span>}

            <textarea name="message" placeholder="Describe the emergency..." rows="5" value={formData.message} onChange={handleChange} />
            {errors.message && <span className="error">{errors.message}</span>}

            <button type="submit">Send Emergency Request</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contactform;
