import React, { useState} from "react";
import axios from "axios";
import "./Admin.css";

const AdminDashboard = () => {

  /* ================= STATE ================= */
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState([]);

  /* ================= LOAD DATA ================= */
  const loadData = async (type) => {
    try {

      let url = "";

      if (type === "users") {
        url = "https://localhost:7156/api/admin/pending-users";
      }

      if (type === "hospitals") {
        url = "https://localhost:7156/api/admin/pending-hospitals";
      }

      if (type === "bloodbanks") {
        url = "https://localhost:7156/api/admin/pending-bloodbanks";
      }

      if (!url) return;

      const res = await axios.get(url);
      setData(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to load data");
    }
  };

 

  /* ================= TAB SWITCH ================= */
  const handleTab = async (type) => {
  setActiveTab(type);

  if (type === "users" || type === "hospitals" || type === "bloodbanks") {
    await loadData(type);
  }
};

  /* ================= APPROVE ================= */
  const approve = async (id) => {
    try {

      let url = "";

      if (activeTab === "users") {
        url = `https://localhost:7156/api/admin/approve-user/${id}`;
      }

      if (activeTab === "hospitals") {
        url = `https://localhost:7156/api/admin/approve-hospital/${id}`;
      }

      if (activeTab === "bloodbanks") {
        url = `https://localhost:7156/api/admin/approve-bloodbank/${id}`;
      }

      await axios.put(url);
      loadData(activeTab);

    } catch {
      alert("Approve failed");
    }
  };

  /* ================= REJECT ================= */
  const reject = async (id) => {
    try {

      let url = "";

      if (activeTab === "users") {
        url = `https://localhost:7156/api/admin/reject-user/${id}`;
      }

      if (activeTab === "hospitals") {
        url = `https://localhost:7156/api/admin/reject-hospital/${id}`;
      }

      if (activeTab === "bloodbanks") {
        url = `https://localhost:7156/api/admin/reject-bloodbank/${id}`;
      }

      await axios.put(url);
      loadData(activeTab);

    } catch {
      alert("Reject failed");
    }
  };

  return (
    <div className="dashboard-container">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <h2 className="logo">Connect Life</h2>

        <ul className="menu">
          <li onClick={() => handleTab("dashboard")}>Dashboard</li>
          <li onClick={() => handleTab("requests")}>Requests</li>
          <li onClick={() => handleTab("donations")}>Donations</li>
          <li onClick={() => handleTab("hospitals")}>Hospitals</li>
          <li onClick={() => handleTab("bloodbanks")}>Blood Banks</li>
          <li onClick={() => handleTab("users")}>Users</li>
          <li onClick={() => handleTab("settings")}>Settings</li>
        </ul>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-content">

        <h1>Admin Dashboard</h1>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <>
            <div className="stats">

              <div className="stat-card">
                <h3>Pending Users</h3>
                <p>--</p>
              </div>

              <div className="stat-card">
                <h3>Hospitals</h3>
                <p>--</p>
              </div>

              <div className="stat-card">
                <h3>Blood Banks</h3>
                <p>--</p>
              </div>

              <div className="stat-card">
                <h3>Requests</h3>
                <p>--</p>
              </div>

            </div>

            <div className="quick-actions">
              <button className="btn-red">Request Blood</button>
              <button className="btn-green">Approve Donation</button>
              <button className="btn-blue">Find Drives</button>
            </div>
          </>
        )}

        {/* ================= USERS / HOSPITALS / BLOODBANKS ================= */}
        {(activeTab === "users" ||
          activeTab === "hospitals" ||
          activeTab === "bloodbanks") && (

          <>
            <h2 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
              Pending {activeTab}
            </h2>

            {data.length === 0 && <p>No pending {activeTab}</p>}

            <div className="admin-users">

              {data.map((item) => (

                <div
                  className="admin-user-card"
                  key={item.userID || item.hospitalID || item.bloodBankID}
                >

                  {/* USERS */}
                  {activeTab === "users" && (
                    <>
                      <strong>{item.fullName}</strong>
                      <p>{item.email}</p>
                      <p>{item.bloodGroup}</p>
                    </>
                  )}

                  {/* HOSPITALS */}
                  {activeTab === "hospitals" && (
                    <>
                      <strong>{item.hospitalName}</strong>
                      <p>{item.email}</p>
                      <p>{item.city}</p>
                    </>
                  )}

                  {/* BLOOD BANKS */}
                  {activeTab === "bloodbanks" && (
                    <>
                      <strong>{item.bankName}</strong>
                      <p>{item.email}</p>
                      <p>{item.city}</p>
                    </>
                  )}

                  <div className="admin-actions">

                    <button
                      className="approve"
                      onClick={() =>
                        approve(item.userID || item.hospitalID || item.bloodBankID)
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject"
                      onClick={() =>
                        reject(item.userID || item.hospitalID || item.bloodBankID)
                      }
                    >
                      Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>
          </>
        )}

        {/* ================= OTHER SECTIONS ================= */}
        {activeTab === "requests" && <h2>Requests Section (Coming Soon)</h2>}
        {activeTab === "donations" && <h2>Donations Section (Coming Soon)</h2>}
        {activeTab === "settings" && <h2>Settings Section (Coming Soon)</h2>}

      </main>
    </div>
  );
};

export default AdminDashboard;