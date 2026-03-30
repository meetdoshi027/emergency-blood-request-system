import React, { useState } from "react";
import "./EventForm.css";

const EventForm = ({ event, closeForm }) => {

const [formData, setFormData] = useState({
name:"",
phone:"",
gender:"",
dob:"",
weight:"",
address:"",
city:"",
state:"",
pincode:"",
agree:false
});

// ✅ DATE FORMAT FUNCTION
const formatDate = (date) => {
const d = new Date(date);
const day = String(d.getDate()).padStart(2, '0');
const month = String(d.getMonth() + 1).padStart(2, '0');
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

const handleSubmit = (e) => {
e.preventDefault();

// ✅ CHECK TERMS
if (!formData.agree) {
alert("Please accept Terms & Conditions");
return;
}

alert("Registration Successful ✅");
closeForm();
};

return (
<div className="modal">

<div className="modal-box">

<h2>Register for Event</h2>

<p><b>{event?.title}</b></p>

{/* ✅ UPDATED DATE FORMAT */}
<p>{formatDate(event?.date)}</p>

<form onSubmit={handleSubmit}>

{/* EVENT NAME READONLY */}
<input 
type="text" 
value={event?.title || ""} 
readOnly 
className="readonly-field"
/>

{/* NAME */}
<input 
type="text" 
name="name"
placeholder="Full Name" 
required 
onChange={handleChange}
/>

{/* PHONE */}
<input 
type="tel" 
name="phone"
placeholder="Mobile Number" 
required 
onChange={handleChange}
/>

{/* GENDER */}
<select name="gender" required onChange={handleChange}>
<option value="">Select Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

{/* DOB */}
<input 
type="date" 
name="dob"
required 
onChange={handleChange}
/>

{/* WEIGHT */}
<input 
type="number" 
name="weight"
placeholder="Weight (kg)" 
required 
onChange={handleChange}
/>

{/* ADDRESS */}
<textarea 
name="address"
placeholder="Address"
required
onChange={handleChange}
/>

{/* CITY */}
<input 
type="text" 
name="city"
placeholder="City"
required
onChange={handleChange}
/>

{/* STATE */}
<input 
type="text" 
name="state"
placeholder="State"
required
onChange={handleChange}
/>

{/* PINCODE */}
<input 
type="number" 
name="pincode"
placeholder="Pincode"
required
onChange={handleChange}
/>

{/* TERMS */}
<label className="checkbox">
<input 
type="checkbox"
name="agree"
onChange={handleChange}
/>
 I agree to Terms & Conditions
</label>

<button type="submit" className="submit-btn">Register</button>

<button type="button" className="close-btn" onClick={closeForm}>
Cancel
</button>

</form>

</div>
</div>
);
};

export default EventForm;