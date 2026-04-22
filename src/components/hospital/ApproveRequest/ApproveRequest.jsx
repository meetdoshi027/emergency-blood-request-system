import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApproveRequest.css";

const ApproveRequest = () => {

  const org = JSON.parse(sessionStorage.getItem("hospitalData"));
  const hospitalToken = sessionStorage.getItem("hospitalToken");
  const [requests, setRequests] = useState([]);

  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
  
          const [oldNormalRes, newNormalRes, bloodBankNormalRes] = await Promise.all([
  axios.get(
    `https://localhost:7156/api/hospital/normal/${org?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get(
    `https://localhost:7156/api/hospital/hospital-normal/${org?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get(
    `https://localhost:7156/api/hospital/bloodbank-normal/${org?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  )
]);

setRequests([
  ...(oldNormalRes.data || []),
  ...(newNormalRes.data || []),
  ...(bloodBankNormalRes.data || [])
]);
      } catch (err) {
        console.error(err);
      }
    };

    if (org) {
      fetchRequests();
    }

  }, [org, hospitalToken]);

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

            {/* ✅ ONLY UI (NO FUNCTION CALL) */}
          
             <button
  onClick={async () => {
    try {
      let url = "";

if (r.hospitalRequestHospitalId) {
  url = `https://localhost:7156/api/hospital/approve/${r.hospitalRequestHospitalId}`;
} else if (r.bloodBankHospitalRequestId) {
  url = `https://localhost:7156/api/hospital/approve-bloodbank/${r.bloodBankHospitalRequestId}`;
} else {
  url = `https://localhost:7156/api/hospital/approve-old/${r.requestId}`;
}
      const res = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${hospitalToken}`
          }
        }
      );

      alert(res.data.message);

      setRequests((prev) =>
  prev.filter((item) => {
    if (r.hospitalRequestHospitalId) {
      return item.hospitalRequestHospitalId !== r.hospitalRequestHospitalId;
    } else if (r.bloodBankHospitalRequestId) {
      return item.bloodBankHospitalRequestId !== r.bloodBankHospitalRequestId;
    } else {
      return item.requestId !== r.requestId;
    }
  })
);
    } catch (err) {
      console.error(err);
      alert(
  err.response?.data?.message ||
  err.response?.data ||
  "Approval failed"
);
    }
  }}
>
  Approve
</button>

          </div>
        ))
      )}
    </div>
  );
};

export default ApproveRequest;