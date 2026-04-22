import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodbankDashboard.css";
import bloodbankImg from "../../assets/bloodbankimage.png";

import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import HostEvents from "./Events/HostEvents";
import ApproveRequest from "./ApproveRequest/ApproveRequest";
import BloodBankRequestForm from "./Request/BloodBankRequestForm";
import BloodStock from "./BloodStock/BloodStock";

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
  const [inventory, setInventory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [active, setActive] = useState("Dashboard");

  const navigate = useNavigate();

  const bloodbank = JSON.parse(sessionStorage.getItem("bloodBankData"));
  const bloodBankToken = sessionStorage.getItem("bloodBankToken");

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!bloodbank) {
      navigate("/login", { state: { loginType: "organization" } });
    }
  }, [bloodbank, navigate]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [
        statsRes,
        oldUrgentRes,
        hospitalUrgentRes,
        bloodBankUrgentRes,
        invRes,
        chartRes
      ] = await Promise.all([
         axios.get(
          `https://localhost:7156/api/bloodbank/stats/${bloodbank?.bankName}`,
          {
            headers: {
              Authorization: `Bearer ${bloodBankToken}`
            }
          }
        ),

        axios.get(
          `https://localhost:7156/api/bloodbank/urgent/${bloodbank?.bankName}`,
          {
            headers: {
              Authorization: `Bearer ${bloodBankToken}`
            }
          }
        ),

        axios.get(
          `https://localhost:7156/api/bloodbank/hospital-urgent/${bloodbank?.bankName}`,
          {
            headers: {
              Authorization: `Bearer ${bloodBankToken}`
            }
          }
        ),

        axios.get(
          `https://localhost:7156/api/bloodbank/bloodbank-urgent/${bloodbank?.bankName}`,
          {
            headers: {
              Authorization: `Bearer ${bloodBankToken}`
            }
          }
        ),

        axios.get(
          `https://localhost:7156/api/bloodbank/inventory/${bloodbank?.bankName}`,
          {
            headers: {
              Authorization: `Bearer ${bloodBankToken}`
            }
          }
        ),

        axios.get("https://localhost:7156/api/bloodbank/chart", {
          headers: {
            Authorization: `Bearer ${bloodBankToken}`
          }
        })
      ]);

      setStats(statsRes.data || {});

      setUrgentRequests([
        ...(oldUrgentRes.data || []),
        ...(hospitalUrgentRes.data || []),
        ...(bloodBankUrgentRes.data || [])
      ]);

      setInventory(invRes.data || []);
      setChartData(chartRes.data || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [bloodbank?.bankName, bloodBankToken]);

  useEffect(() => {
    if (bloodbank?.bankName && bloodBankToken) {
      fetchData();
    }
  }, [fetchData, bloodbank?.bankName, bloodBankToken]);

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
                      <h5>{bloodbank?.bankName}</h5>
                      <p>{bloodbank?.email}</p>

                      <button onClick={() => navigate("/bloodbank/account")}>
                        My Account
                      </button>

                      <button
                        className="logout"
                        onClick={() => {
                          sessionStorage.removeItem("bloodBankData");
                          sessionStorage.removeItem("bloodBankType");
                          sessionStorage.removeItem("bloodBankToken");
                          navigate("/login", {
                            state: { loginType: "organization" }
                          });
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

                            setUrgentRequests((prev) =>
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
                            <span className="units-text">
                              {item.units} Units
                            </span>

                            <span
                              className={`inventory-status ${item.status.toLowerCase()}`}
                            >
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

        {/* ================= OTHER VIEWS ================= */}
        {active === "HOST EVENTS" && <HostEvents />}

        {active === "APPROVE BLOOD REQUEST" && <ApproveRequest />}

        {active === "REQUEST BLOOD" && <BloodBankRequestForm />}

        {active === "BLOOD STOCK MANAGEMENT" && <BloodStock />}
      </div>
    </div>
  );
};

export default BloodbankDashboard;