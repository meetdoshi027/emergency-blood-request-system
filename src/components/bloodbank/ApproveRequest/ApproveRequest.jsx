import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApproveRequest.css";

const ApproveRequest = () => {

  const org = JSON.parse(localStorage.getItem("orgData"));
  const [requests, setRequests] = useState([]);

  // ✅ FIXED useEffect (NO ERROR)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7156/api/bloodbank/normal/${org?.bankName}`
        );

        setRequests(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (org) {
      fetchRequests();
    }

  }, [org]);

  return (
    <div className="approve-container">
      <h2>Approve Blood Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((r, i) => (
          <div className="approve-card" key={i}>
            <span className="badge">{r.bloodGroup}</span>

            <div>
              <h4>{r.patientName}</h4>
              <p>{r.units} Units Required</p>
            </div>

            {/* ✅ UI ONLY (NO FUNCTION) */}
            <button>
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ApproveRequest;