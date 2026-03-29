import React, { useState } from "react";
import "./EventForm.css";

const EventForm = ({ event, closeForm }) => {

const [formData, setFormData] = useState({
name:"",
email:"",
phone:"",
bloodGroup:"",
});

const handleChange = (e) => {
setFormData({...formData, [e.target.name]: e.target.value});
};

const handleSubmit = (e) => {
e.preventDefault();
alert("Registration Successful ✅");
closeForm();
};

return (
<div className="modal">

<div className="modal-box">

<h2>Register for Event</h2>

<p><b>{event?.title}</b></p>
<p>{event?.date}</p>

<form onSubmit={handleSubmit}>

<input 
type="text" 
name="name"
placeholder="Full Name" 
required 
onChange={handleChange}
/>

<input 
type="email" 
name="email"
placeholder="Email" 
required 
onChange={handleChange}
/>

<input 
type="tel" 
name="phone"
placeholder="Mobile Number" 
required 
onChange={handleChange}
/>

<select name="bloodGroup" required onChange={handleChange}>
<option value="">Select Blood Group</option>
<option>A+</option><option>B+</option>
<option>O+</option><option>AB+</option>
</select>

<button type="submit" className="submit-btn">Submit</button>
<button type="button" className="close-btn" onClick={closeForm}>
Close
</button>

</form>

</div>
</div>
);
};

export default EventForm;