import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const AdminDashboard = () => {

  /* ================= STATE ================= */
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState([]);

  const [counts, setCounts] = useState({
    users: 0,
    hospitals: 0,
    bloodBanks: 0,
    donors: 0
  });

  /* ================= LOAD COUNTS ================= */
  const loadCounts = async () => {
    try {
      const res = await axios.get("https://localhost:7156/api/admin/counts");
      setCounts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

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

      if (type === "donors") {
        url = "https://localhost:7156/api/admin/pending-donors";
      }

      if (!url) return;

      const res = await axios.get(url);
      setData(res.data);

    } catch (error) {
      console.error(error);
      alert("Failed to load data");
    }
  };

  /* ================= LOAD ON START ================= */
  useEffect(() => {
    const fetchData = async () => {
      await loadCounts();
    };
    fetchData();
  }, []);

  /* ================= TAB SWITCH ================= */
  const handleTab = async (type) => {
    setActiveTab(type);

    if (
      type === "users" ||
      type === "hospitals" ||
      type === "bloodbanks" ||
      type === "donors"
    ) {
      await loadData(type);
    }
  };

  /* ================= APPROVE ================= */
  const approve = async (id) => {
    try {

      // 🔥 REMOVE FROM UI INSTANTLY
      setData(prev =>
        prev.filter(item =>
          (item.userID ||
           item.hospitalID ||
           item.bloodBankID ||
           item.donorID) !== id
        )
      );

      // 🔥 UPDATE COUNT
      setCounts(prev => ({
        ...prev,
        [activeTab]: prev[activeTab] - 1
      }));

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

      if (activeTab === "donors") {
        url = `https://localhost:7156/api/admin/approve-donor/${id}`;
      }

      await axios.put(url);

    } catch {
      alert("Approve failed");
      loadData(activeTab);
      loadCounts();
    }
  };

  /* ================= REJECT ================= */
  const reject = async (id) => {
    try {

      // 🔥 REMOVE FROM UI INSTANTLY
      setData(prev =>
        prev.filter(item =>
          (item.userID ||
           item.hospitalID ||
           item.bloodBankID ||
           item.donorID) !== id
        )
      );

      // 🔥 UPDATE COUNT
      setCounts(prev => ({
        ...prev,
        [activeTab]: prev[activeTab] - 1
      }));

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

      if (activeTab === "donors") {
        url = `https://localhost:7156/api/admin/reject-donor/${id}`;
      }

      await axios.put(url);

    } catch {
      alert("Reject failed");
      loadData(activeTab);
      loadCounts();
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
          <li onClick={() => handleTab("donors")}>Donors</li>
          <li onClick={() => handleTab("users")}>Users</li>
          <li onClick={() => handleTab("settings")}>Settings</li>
        </ul>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main-content">

        <h1>Admin Dashboard</h1>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h2>Users</h2>
              <p className="count">{counts.users}</p>
              <button onClick={() => handleTab("users")}>
                View Details
              </button>
            </div>

            <div className="dashboard-card">
              <h2>Donors</h2>
              <p className="count">{counts.donors}</p>
              <button onClick={() => handleTab("donors")}>
                View Details
              </button>
            </div>

            <div className="dashboard-card">
              <h2>Hospitals</h2>
              <p className="count">{counts.hospitals}</p>
              <button onClick={() => handleTab("hospitals")}>
                View Details
              </button>
            </div>

            <div className="dashboard-card">
              <h2>Blood Banks</h2>
              <p className="count">{counts.bloodBanks}</p>
              <button onClick={() => handleTab("bloodbanks")}>
                View Details
              </button>
            </div>

          </div>
        )}

        {/* ================= DATA ================= */}
        {(activeTab === "users" ||
          activeTab === "hospitals" ||
          activeTab === "bloodbanks" ||
          activeTab === "donors") && (

          <>
            <h2 style={{ marginBottom: "20px", textTransform: "capitalize" }}>
              Pending {activeTab}
            </h2>

            {data.length === 0 && <p>No pending {activeTab}</p>}

            <div className="admin-users">

              {data.map((item) => (

                <div
                  className="admin-user-card"
                  key={
                    item.userID ||
                    item.hospitalID ||
                    item.bloodBankID ||
                    item.donorID
                  }
                >

                  {activeTab === "users" && (
                    <>
                      <strong>{item.fullName}</strong>
                      <p>{item.email}</p>
                      <p>{item.bloodGroup}</p>
                    </>
                  )}

                  {activeTab === "hospitals" && (
                    <>
                      <strong>{item.hospitalName}</strong>
                      <p>{item.email}</p>
                      <p>{item.city}</p>
                    </>
                  )}

                  {activeTab === "bloodbanks" && (
                    <>
                      <strong>{item.bankName}</strong>
                      <p>{item.email}</p>
                      <p>{item.city}</p>
                    </>
                  )}

                  {activeTab === "donors" && (
                    <>
                      <strong>{item.name}</strong>
                      <p>{item.email}</p>
                      <p>{item.bloodGroup}</p>
                      <p>{item.city}</p>
                    </>
                  )}

                  <div className="admin-actions">

                    <button
                      className="approve"
                      onClick={() =>
                        approve(
                          item.userID ||
                          item.hospitalID ||
                          item.bloodBankID ||
                          item.donorID
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject"
                      onClick={() =>
                        reject(
                          item.userID ||
                          item.hospitalID ||
                          item.bloodBankID ||
                          item.donorID
                        )
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

      </main>
    </div>
  );
};

export default AdminDashboard;


