import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApproveRequest.css";

const ApproveRequest = () => {
  const org = JSON.parse(sessionStorage.getItem("bloodBankData"));
  const bloodBankToken = sessionStorage.getItem("bloodBankToken");

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [oldNormalRes, hospitalNormalRes, bloodBankNormalRes] = await Promise.all([
          axios.get(
            `https://localhost:7156/api/bloodbank/normal/${org?.bankName}`,
            {
              headers: {
                Authorization: `Bearer ${bloodBankToken}`
              }
            }
          ),

          axios.get(
            `https://localhost:7156/api/bloodbank/hospital-normal/${org?.bankName}`,
            {
              headers: {
                Authorization: `Bearer ${bloodBankToken}`
              }
            }
          ),

          axios.get(
            `https://localhost:7156/api/bloodbank/bloodbank-normal/${org?.bankName}`,
            {
              headers: {
                Authorization: `Bearer ${bloodBankToken}`
              }
            }
          )
        ]);

        setRequests([
          ...(oldNormalRes.data || []),
          ...(hospitalNormalRes.data || []),
          ...(bloodBankNormalRes.data || [])
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    if (org?.bankName) {
      fetchRequests();
    }
  }, [org, bloodBankToken]);

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

            <button
              onClick={async () => {
                try {
                  let url = "";

                  if (r.hospitalBloodBankRequestId) {
                    url = `https://localhost:7156/api/bloodbank/approve-hospital/${r.hospitalBloodBankRequestId}`;
                  } else if (r.bloodBankRequestBloodBankId) {
                    url = `https://localhost:7156/api/bloodbank/approve/${r.bloodBankRequestBloodBankId}`;
                  } else {
                    url = `https://localhost:7156/api/bloodbank/approve-old/${r.requestId}`;
                  }

                  const res = await axios.post(
                    url,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${bloodBankToken}`
                      }
                    }
                  );

                  alert(res.data.message);

                  setRequests((prev) =>
                    prev.filter((item) => {
                      if (r.hospitalBloodBankRequestId) {
                        return (
                          item.hospitalBloodBankRequestId !==
                          r.hospitalBloodBankRequestId
                        );
                      } else if (r.bloodBankRequestBloodBankId) {
                        return (
                          item.bloodBankRequestBloodBankId !==
                          r.bloodBankRequestBloodBankId
                        );
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