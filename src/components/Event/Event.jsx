import React, { useState } from "react";
import "./Event.css";
import EventForm from "./EventForm"; // ✅ import form

/* IMAGES */
import img1 from "../../assets/Megablood.jpg";
import img2 from "../../assets/hospital.jpg";
import img3 from "../../assets/togetherblood.jpg";
import bg from "../../assets/blood.webp";

const Event = () => {

const today = new Date().toISOString().split("T")[0];

// ✅ STATE
const [showForm, setShowForm] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);

const events = [

// 🔴 PAST
{title:"Blood Donation Camp",organization:"Red Cross",date:"2025-03-01",image:img1,description:"Donate blood"},
{title:"Community Blood Drive",organization:"NGO Trust",date:"2025-02-15",image:img2,description:"Helping people"},
{title:"Health Awareness Camp",organization:"City NGO",date:"2025-01-10",image:img3,description:"Awareness"},
{title:"Old Blood Camp",organization:"Health Org",date:"2024-12-20",image:img1,description:"Old event"},

// 🟡 TODAY
{title:"Today Blood Camp 1",organization:"Local NGO",date:today,image:img2,description:"Donate today"},
{title:"Today Blood Camp 2",organization:"City Hospital",date:today,image:img3,description:"Emergency"},
{title:"Today Health Camp",organization:"Health Org",date:today,image:img1,description:"Free checkup"},
{title:"Today Mega Drive",organization:"Trust Org",date:today,image:img2,description:"Join now"},

// 🟢 FUTURE
{title:"Future Blood Camp",organization:"Apollo Hospital",date:"2026-05-20",image:img1,description:"Biggest drive"},
{title:"Upcoming Donation",organization:"NGO Trust",date:"2026-06-10",image:img2,description:"Save lives"},
{title:"Mega Health Camp",organization:"City Hospital",date:"2026-07-01",image:img3,description:"Free services"},
{title:"Emergency Future Drive",organization:"Red Cross",date:"2026-08-15",image:img1,description:"Urgent"}
];

// FILTER
const pastEvents = events.filter(e => e.date < today);
const presentEvents = events.filter(e => e.date === today);
const futureEvents = events.filter(e => e.date > today);

// ✅ CLICK REGISTER
const handleRegister = (event) => {
setSelectedEvent(event);
setShowForm(true);
};

// RENDER
const renderEvents = (list, type) => (
<div className="event-grid">

{list.map((event,index)=>(

<div className="event-card" key={index}>

<img src={event.image} alt="event" />

<div className="event-content">
<h3>{event.title}</h3>
<p>🏥 {event.organization}</p>
<p>📅 {event.date}</p>
<p className="desc">{event.description}</p>

{type === "future" && (
<button 
className="btn"
onClick={() => handleRegister(event)}
>
Register
</button>
)}

</div>
</div>

))}

</div>
);

return (
<div className="event-container" style={{ backgroundImage: `url(${bg})` }}>

<h1 className="main-title">Blood Donation Events</h1>

<h2 className="section-title">🕘 Past Event</h2>
{renderEvents(pastEvents,"past")}

<h2 className="section-title">📍 Today Event</h2>
{renderEvents(presentEvents,"present")}

<h2 className="section-title">🚀 Future Event</h2>
{renderEvents(futureEvents,"future")}

{/* ✅ FORM POPUP */}
{showForm && (
<EventForm 
event={selectedEvent}
closeForm={() => setShowForm(false)}
/>
)}

</div>
);
};

export default Event;