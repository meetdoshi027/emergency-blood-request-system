import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const API = "https://localhost:7156/api/admin";

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [counts, setCounts] = useState({});
  const [data, setData] = useState([]);

  // ✅ LOAD COUNTS
  const loadCounts = async () => {
    try {
      const res = await axios.get(`${API}/counts`);
      setCounts(res.data);
    } catch (err) {
      console.error("Error loading counts", err);
    }
  };

  // ✅ LOAD DATA
  const loadData = async (type) => {
    try {
      const res = await axios.get(`${API}/${type}`);
      setData(res.data);
    } catch (err) {
      console.error("Error loading data", err);
    }
  };

  // ✅ FIXED AUTO REFRESH (NO WARNING)
  useEffect(() => {
    let isMounted = true;

    const fetchCounts = async () => {
      if (isMounted) {
        await loadCounts();
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // ✅ TAB SWITCH
  const handleTab = (tab) => {
    setActiveTab(tab);

    if (tab === "users") loadData("pending-users");
    if (tab === "hospitals") loadData("pending-hospitals");
    if (tab === "bloodbanks") loadData("pending-bloodbanks");
    if (tab === "donors") loadData("pending-donors");

    if (tab === "manage-users") loadData("all-users");
    if (tab === "manage-hospitals") loadData("all-hospitals");
    if (tab === "manage-bloodbanks") loadData("all-bloodbanks");
  };

  // ✅ APPROVE
  const approve = async (id) => {
    try {
      const type = activeTab.slice(0, -1);

      await axios.put(`${API}/approve-${type}/${id}`);

      setData(prev =>
        prev.filter(x =>
          (x.userID || x.hospitalID || x.bloodBankID || x.donorID) !== id
        )
      );

      loadCounts();
    } catch {
      alert("Approve failed");
    }
  };

  // ✅ NEW: REJECT FUNCTION
  const reject = async (id) => {
    try {
      const type = activeTab.slice(0, -1);

      await axios.put(`${API}/reject-${type}/${id}`);

      setData(prev =>
        prev.filter(x =>
          (x.userID || x.hospitalID || x.bloodBankID || x.donorID) !== id
        )
      );

      loadCounts();
    } catch {
      alert("Reject failed");
    }
  };

  // ✅ BLOCK / UNBLOCK
  const toggleBlock = async (id) => {
    try {
      const type = activeTab.replace("manage-", "").slice(0, -1);

      await axios.put(`${API}/toggle-${type}/${id}`);

      handleTab(activeTab);
    } catch {
      alert("Block/Unblock failed");
    }
  };

  return (
    <div className="dashboard-container">

      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <h2>Connect Life</h2>
        <ul>
          <li onClick={() => handleTab("dashboard")}>Dashboard</li>
          <li onClick={() => handleTab("users")}>Pending Users</li>
          <li onClick={() => handleTab("donors")}>Pending Donors</li>
          <li onClick={() => handleTab("hospitals")}>Pending Hospitals</li>
          <li onClick={() => handleTab("bloodbanks")}>Pending Blood Banks</li>

          <li onClick={() => handleTab("manage-users")}>Manage Users</li>
          <li onClick={() => handleTab("manage-hospitals")}>Manage Hospitals</li>
          <li onClick={() => handleTab("manage-bloodbanks")}>Manage Blood Banks</li>
        </ul>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="main-content">

        <h1>Admin Dashboard</h1>

        {/* ===== DASHBOARD ===== */}
        {activeTab === "dashboard" && (
          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h2>Total Users</h2>
              <p>{counts.users || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Total Donors</h2>
              <p>{counts.donors || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Total Hospitals</h2>
              <p>{counts.hospitals || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Total Blood Banks</h2>
              <p>{counts.bloodBanks || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Pending Users</h2>
              <p>{counts.pendingUsers || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Pending Donors</h2>
              <p>{counts.pendingDonors || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Pending Hospitals</h2>
              <p>{counts.pendingHospitals || 0}</p>
            </div>

            <div className="dashboard-card">
              <h2>Pending Blood Banks</h2>
              <p>{counts.pendingBloodBanks || 0}</p>
            </div>

          </div>
        )}

        {/* ===== APPROVAL ===== */}
        {["users","donors","hospitals","bloodbanks"].includes(activeTab) && (
          <div className="admin-users">
            {data.length === 0 ? (
              <p>No pending records</p>
            ) : (
              data.map(item => (
                <div
                  className="admin-user-card"
                  key={
                    item.userID ||
                    item.hospitalID ||
                    item.bloodBankID ||
                    item.donorID
                  }
                >
                  <p>
                    {item.fullName ||
                     item.name ||
                     item.hospitalName ||
                     item.bankName}
                  </p>

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
              ))
            )}
          </div>
        )}

        {/* ===== BLOCK SYSTEM ===== */}
        {activeTab.includes("manage") && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              ) : (
                data.map(item => (
                  <tr key={item.userID || item.hospitalID || item.bloodBankID}>
                    <td>
                      {item.fullName ||
                       item.hospitalName ||
                       item.bankName}
                    </td>

                    <td>{item.email}</td>

                    <td>
  {item.status === "Rejected"
    ? "Inactive ❌"
    : item.isBlocked
    ? "Blocked ❌"
    : "Active ✅"}
</td>

<td>
  {item.status === "Rejected" ? (
    <span style={{ color: "gray" }}>No Action</span>
  ) : (
    <button
      className={item.isBlocked ? "unblock" : "block"}
      onClick={() =>
        toggleBlock(
          item.userID ||
          item.hospitalID ||
          item.bloodBankID
        )
      }
    >
      {item.isBlocked ? "Unblock" : "Block"}
    </button>
  )}
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;