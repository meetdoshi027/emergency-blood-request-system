import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./HospitalDashboard.css";
import hospitalImg from "../../assets/hospitalimage.png"; 
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import HostEvents from "./Events/HostEvents"; // ✅ IMPORT ADDED
import ApproveRequest from "./ApproveRequest/ApproveRequest";
import HospitalRequestForm from "./Request/HospitalRequestForm";
import BloodStock from "./BloodStock/BloodStock";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const HospitalDashboard = () => {

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  
  const [inventory, setInventory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [active, setActive] = useState("Dashboard");

  const navigate = useNavigate();
  const hospital = JSON.parse(sessionStorage.getItem("hospitalData"));
  const hospitalToken = sessionStorage.getItem("hospitalToken");

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
  if (!hospital) {
    navigate("/login", { state: { loginType: "organization" } });
  }
}, [hospital, navigate]);

  const fetchData = useCallback(async () => {
  try {
    setLoading(true);

   const [
  statsRes,
  oldUrgentRes,
  newUrgentRes,
  bloodBankUrgentRes,
  invRes,
  chartRes
] = await Promise.all([
  axios.get(
    `https://localhost:7156/api/hospital/stats/${hospital?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get(
    `https://localhost:7156/api/hospital/urgent/${hospital?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get(
    `https://localhost:7156/api/hospital/hospital-urgent/${hospital?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get(
    `https://localhost:7156/api/hospital/bloodbank-urgent/${hospital?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get(
    `https://localhost:7156/api/hospital/inventory/${hospital?.hospitalName}`,
    {
      headers: {
        Authorization: `Bearer ${hospitalToken}`
      }
    }
  ),

  axios.get("https://localhost:7156/api/hospital/chart", {
    headers: {
      Authorization: `Bearer ${hospitalToken}`
    }
  })
]);

    setStats(statsRes.data || {});
    setUrgentRequests([
  ...(oldUrgentRes.data || []),
  ...(newUrgentRes.data || []),
  ...(bloodBankUrgentRes.data || [])
]);
    setInventory(invRes.data || []);
    setChartData(chartRes.data || []);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
  } finally {
    setLoading(false);
  }
}, [hospital?.hospitalName, hospitalToken]);

  useEffect(() => {
  if (hospital?.hospitalName && hospitalToken) {
    fetchData();
  }
}, [fetchData, hospital?.hospitalName, hospitalToken]);

  

  return (
    <div className="layout">

      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <h2 className="logo">ConnectLife</h2>

        <ul>
          {[
            "Dashboard",
            "APPROVE BLOOD REQUEST",
            "REQUEST BLOOD",
            "HOST EVENTS",
            "BLOOD STOCK MANAGEMENT"
          ].map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main">

        {/* ================= DASHBOARD VIEW ================= */}
        {active === "Dashboard" && (
          <>
            {/* HEADER */}
             <div className="header">
  <h1>🏥 Hospital Dashboard</h1>

  {hospital && (
    <div className="profile-container">

      <img
        src={hospitalImg}
        alt="profile"
        onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="dropdown-box">

          <h5>{hospital?.hospitalName}</h5>
          <p>{hospital?.email}</p>

          <button onClick={() => navigate("/hospital/account")}>
            My Account
          </button>

          <button
            className="logout"
            onClick={() => {
              sessionStorage.removeItem("hospitalData");
              sessionStorage.removeItem("hospitalType");
              sessionStorage.removeItem("hospitalToken");
              navigate("/login", { state: { loginType: "organization" } });
            }}
          >
            Sign Out
          </button>

        </div>
      )}
    </div>
  )}
</div>
            {/* STATS */}
            <div className="stats">
              {loading ? (
                <Skeleton height={120} count={3} />
              ) : (
                <>
                  <div className="card red">
                    <h2>{stats.totalStock || 0}</h2>
                    <p>Total Stock</p>
                  </div>

                  <div className="card blue">
                    <h2>{stats.pendingRequests || 0}</h2>
                    <p>Pending Requests</p>
                  </div>

                  <div className="card green">
                    <h2>{stats.eventHosted || 0}</h2>
                    <p>Event Hosted</p>
                  </div>
                </>
              )}
            </div>

            {/* GRID */}
            <div className="grid">

              {/* REQUESTS */}
              <div className="requests">
  <h3>🚨 Urgent Requests</h3>

  {loading ? (
    <Skeleton count={3} height={60} />
  ) : urgentRequests.length === 0 ? (
    <p>No urgent requests</p>
  ) : (
    urgentRequests.map((r, i) => (
      <div className="request-card" key={i}>
        <span className="badge">{r.bloodGroup}</span>

        <div>
          <h4>{r.patientName}</h4>
          <p>{r.units} Units Required</p>
        </div>

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

      setUrgentRequests((prev) =>
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

              {/* INVENTORY */}
              <div className="inventory">
  <h3>🧪 Live Inventory</h3>

  {loading ? (
    <Skeleton count={8} height={28} />
  ) : inventory.length === 0 ? (
    <p>No inventory data</p>
  ) : (
    inventory.map((item) => (
      <div key={item.group} className="inventory-card">
        <div className="inventory-top">
          <div className="blood-group-box">
            {item.group}
          </div>

          <div className="inventory-info">
            <div className="inventory-header">
              <span className="units-text">{item.units} Units</span>

              <span className={`inventory-status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className={`progress-fill ${item.status.toLowerCase()}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

            </div>

            {/* CHART */}
            <div className="chart-section">
              <h3>📊 Blood Usage (Last 7 Days)</h3>

              {loading ? (
                <Skeleton height={250} />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="day" />
                    <Tooltip />
                    <Bar dataKey="units" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}

        {/* ================= HOST EVENTS VIEW ================= */}
        {active === "HOST EVENTS" && <HostEvents />}

        {active === "APPROVE BLOOD REQUEST" && (<ApproveRequest />)}

        {active === "REQUEST BLOOD" && <HospitalRequestForm />}

        {active === "BLOOD STOCK MANAGEMENT" && <BloodStock />}

      </div>
    </div>
  );
};

export default HospitalDashboard;
