import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodbankDashboard.css";
import bloodbankImg from "../../assets/bloodbankimage.png"; 
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import HostEvents from "./Events/HostEvents"; // ✅ IMPORT ADDED

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const BloodbankDashboard = () => {

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [active, setActive] = useState("Dashboard");

   const navigate = useNavigate();
const bloodbank = JSON.parse(localStorage.getItem("orgData"));

 const [showMenu, setShowMenu] = useState(false);

 useEffect(() => {
  if (!bloodbank) {
    navigate("/login", { state: { loginType: "organization" } });
  }
}, [bloodbank, navigate]);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, reqRes, invRes, chartRes] = await Promise.all([
        axios.get("https://localhost:7156/api/hospital/stats"),
        axios.get("https://localhost:7156/api/hospital/requests"),
        axios.get("https://localhost:7156/api/hospital/inventory"),
        axios.get("https://localhost:7156/api/hospital/chart")
      ]);

      setStats(statsRes.data || {});
      setRequests(reqRes.data || []);
      setInventory(invRes.data || []);
      setChartData(chartRes.data || []);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    loadData();

    const interval = setInterval(() => {
      if (isMounted) {
        fetchData();
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [fetchData]);

  const approveRequest = async (id) => {
    try {
      await axios.put(`https://localhost:7156/api/hospital/approve/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="layout">

      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <h2 className="logo">🩸 ConnectLife</h2>

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
  <h1>🩸 Blood Bank Dashboard</h1>

  {bloodbank && (
    <div className="profile-container">

      <img
        src={bloodbankImg}
        alt="profile"
        onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="dropdown-box">

          <h5>{bloodbank?.bankName}</h5> {/* ✅ FIXED bankame */}
          <p>{bloodbank?.email}</p>

          <button onClick={() => navigate("/bloodbank/account")}>
            My Account
          </button>

          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("orgData");
              localStorage.removeItem("orgType");
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
                    <h2>{stats.totalDonors || 0}</h2>
                    <p>Total Donors</p>
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
                ) : requests.length === 0 ? (
                  <p>No requests available</p>
                ) : (
                  requests.map((r) => (
                    <div className="request-card" key={r.id}>
                      <span className="badge">{r.bloodGroup}</span>

                      <div>
                        <h4>{r.hospitalName}</h4>
                        <p>{r.units} Units Required</p>
                      </div>

                      <button onClick={() => approveRequest(r.id)}>
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
                  <Skeleton count={4} height={20} />
                ) : inventory.length === 0 ? (
                  <p>No inventory data</p>
                ) : (
                  inventory.map((item) => (
                    <div key={item.group} className="progress">
                      <p>{item.group}</p>
                      <div>
                        <span style={{ width: `${item.percentage}%` }}></span>
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

      </div>
    </div>
  );
};

export default BloodbankDashboard;
