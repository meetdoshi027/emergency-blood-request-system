import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Admin.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     LOAD PENDING USERS
     =============================== */
  const loadUsers = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://localhost:7156/api/admin/pending-users"
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to load users", error);
      alert("Failed to load pending users");
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===============================
     ON PAGE LOAD
     =============================== */
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /* ===============================
     APPROVE USER
     =============================== */
  const approve = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/approve-user/${id}`
      );
      loadUsers();
    } catch (error) {
      console.error("Approval failed", error);
      alert("Failed to approve user");
    }
  };

  /* ===============================
     REJECT USER
     =============================== */
  const reject = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/reject-user/${id}`
      );
      loadUsers();
    } catch (error) {
      console.error("Rejection failed", error);
      alert("Failed to reject user");
    }
  };

  /* ===============================
     UI
     =============================== */
  return (
    <div className="admin-dashboard">
      <h2>Pending User Approvals</h2>

      {loading && <p className="admin-empty">Loading users...</p>}

      {!loading && users.length === 0 && (
        <p className="admin-empty">No pending users</p>
      )}

      <div className="admin-users">
        {users.map((u) => (
          <div className="admin-user-card" key={u.userID}>
            <div className="admin-user-info">
              <strong>{u.fullName}</strong>
              <span>{u.email}</span>
              <span>Blood Group: {u.bloodGroup}</span>
             
            </div>

            <div className="admin-actions">
              <button
                className="approve"
                onClick={() => approve(u.userID)}
              >
                Approve
              </button>

              <button
                className="reject"
                onClick={() => reject(u.userID)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
