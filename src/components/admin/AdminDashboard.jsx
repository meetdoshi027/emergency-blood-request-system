import React from "react";
import "./Admin.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Connect Life</h2>

        <ul className="menu">
          <li>Dashboard</li>
          <li>Requests</li>
          <li>Donations</li>
          <li>Hospitals</li>
          <li>Blood Banks</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        <h1>Admin Dashboard</h1>

        {/* STATS */}
        <div className="stats">

          <div className="stat-card">
            <h3>Pending Users</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>Hospitals</h3>
            <p>5</p>
          </div>

          <div className="stat-card">
            <h3>Blood Banks</h3>
            <p>3</p>
          </div>

          <div className="stat-card">
            <h3>Requests</h3>
            <p>8</p>
          </div>

        </div>

        {/* QUICK ACTION */}
        <div className="quick-actions">

          <button className="btn-red">Request Blood</button>
          <button className="btn-green">Approve Donation</button>
          <button className="btn-blue">Find Drives</button>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;