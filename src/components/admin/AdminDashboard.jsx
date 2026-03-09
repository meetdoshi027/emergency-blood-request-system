import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Admin.css";

const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
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
    }
  }, []);

  /* ===============================
     LOAD PENDING HOSPITALS
     =============================== */
  const loadHospitals = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://localhost:7156/api/admin/pending-hospitals"
      );
      setHospitals(res.data);
    } catch (error) {
      console.error("Failed to load hospitals", error);
    }
  }, []);

  /* ===============================
     LOAD PENDING BLOOD BANKS
     =============================== */
  const loadBloodBanks = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://localhost:7156/api/admin/pending-bloodbanks"
      );
      setBloodBanks(res.data);
    } catch (error) {
      console.error("Failed to load blood banks", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ===============================
     PAGE LOAD
     =============================== */
  useEffect(() => {
    loadUsers();
    loadHospitals();
    loadBloodBanks();
  }, [loadUsers, loadHospitals, loadBloodBanks]);

  /* ===============================
     USER APPROVAL
     =============================== */
  const approveUser = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/approve-user/${id}`
      );
      loadUsers();
    } catch {
      alert("Failed to approve user");
    }
  };

  const rejectUser = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/reject-user/${id}`
      );
      loadUsers();
    } catch {
      alert("Failed to reject user");
    }
  };

  /* ===============================
     HOSPITAL APPROVAL
     =============================== */
  const approveHospital = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/approve-hospital/${id}`
      );
      loadHospitals();
    } catch {
      alert("Failed to approve hospital");
    }
  };

  const rejectHospital = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/reject-hospital/${id}`
      );
      loadHospitals();
    } catch {
      alert("Failed to reject hospital");
    }
  };

  /* ===============================
     BLOODBANK APPROVAL
     =============================== */
  const approveBloodBank = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/approve-bloodbank/${id}`
      );
      loadBloodBanks();
    } catch {
      alert("Failed to approve blood bank");
    }
  };

  const rejectBloodBank = async (id) => {
    try {
      await axios.put(
        `https://localhost:7156/api/admin/reject-bloodbank/${id}`
      );
      loadBloodBanks();
    } catch {
      alert("Failed to reject blood bank");
    }
  };

  return (
    <div className="admin-dashboard">

      {/* ================= USERS ================= */}
      <h2>Pending User Approvals</h2>

      {loading && <p className="admin-empty">Loading...</p>}
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
                onClick={() => approveUser(u.userID)}
              >
                Approve
              </button>

              <button
                className="reject"
                onClick={() => rejectUser(u.userID)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* ================= HOSPITALS ================= */}
      <h2>Pending Hospital Approvals</h2>

      {hospitals.length === 0 && (
        <p className="admin-empty">No pending hospitals</p>
      )}

      <div className="admin-users">
        {hospitals.map((h) => (
          <div className="admin-user-card" key={h.hospitalID}>
            <div className="admin-user-info">
              <strong>{h.hospitalName}</strong>
              <span>{h.email}</span>
              <span>City: {h.city}</span>
            </div>

            <div className="admin-actions">
              <button
                className="approve"
                onClick={() => approveHospital(h.hospitalID)}
              >
                Approve
              </button>

              <button
                className="reject"
                onClick={() => rejectHospital(h.hospitalID)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* ================= BLOOD BANKS ================= */}
      <h2>Pending Blood Bank Approvals</h2>

      {bloodBanks.length === 0 && (
        <p className="admin-empty">No pending blood banks</p>
      )}

      <div className="admin-users">
        {bloodBanks.map((b) => (
          <div className="admin-user-card" key={b.bloodBankID}>
            <div className="admin-user-info">
              <strong>{b.bankName}</strong>
              <span>{b.email}</span>
              <span>City: {b.city}</span>
            </div>

            <div className="admin-actions">
              <button
                className="approve"
                onClick={() => approveBloodBank(b.bloodBankID)}
              >
                Approve
              </button>

              <button
                className="reject"
                onClick={() => rejectBloodBank(b.bloodBankID)}
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