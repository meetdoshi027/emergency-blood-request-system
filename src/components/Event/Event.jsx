import React from "react";
import "./Event.css";

/* ✅ EVENT IMAGES */
import img1 from "../../assets/Megablood.jpg";
import img2 from "../../assets/hospital.jpg";
import img3 from "../../assets/togetherblood.jpg";

/* ✅ BACKGROUND IMAGE */
import bg from "../../assets/blood.webp";

const Event = () => {

const events = [
{
title:"Blood Donation Camp",
organization:"Red Cross",
date:"2025-03-01",
image: img1,
description:"Donate blood and save lives"
},
{
title:"Community Blood Drive",
organization:"NGO Trust",
date:"2025-02-15",
image: img2,
description:"Join hands to help others"
},
{
title:"Free Health Camp",
organization:"Health Org",
date:"2025-01-20",
image: img3,
description:"Free checkup & blood donation"
},
{
title:"Emergency Blood Drive",
organization:"City Hospital",
date:"2026-03-10",
image: img2,
description:"Urgent blood requirement"
},
{
title:"Health Camp Today",
organization:"Local NGO",
date:new Date().toISOString().split("T")[0],
image: img3,
description:"Today special blood donation"
},
{
title:"Mega Blood Camp",
organization:"Apollo Hospital",
date:"2026-05-20",
image: img1,
description:"Join the biggest blood drive"
}
];

// 📅 DATE LOGIC
const today = new Date().toISOString().split("T")[0];

const pastEvents = events.filter(e => e.date < today);
const presentEvents = events.filter(e => e.date === today);
const futureEvents = events.filter(e => e.date > today);

// 🎯 RENDER FUNCTION
const renderEvents = (list) => (
<div className="event-grid">

{list.length === 0 ? (
<p className="no-data">No events available</p>
) : (

list.map((event,index)=>(

<div className="event-card" key={index}>

<img src={event.image} alt="event" />

<div className="event-content">
<h3>{event.title}</h3>
<p>🏥 {event.organization}</p>
<p>📅 {event.date}</p>
<p className="desc">{event.description}</p>

<button className="btn">Register</button>
</div>

</div>

))

)}

</div>
);

// 🎨 UI
return (
<div 
className="event-container"
style={{ backgroundImage: `url(${bg})` }}
>

<h2 className="main-title">Blood Donation Events</h2>

<h3 className="section-title">Past Events</h3>
{renderEvents(pastEvents)}

<h3 className="section-title">Today Events</h3>
{renderEvents(presentEvents)}

<h3 className="section-title">Upcoming Events</h3>
{renderEvents(futureEvents)}

</div>
);
};

export default Event;