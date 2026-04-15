import React from "react";
import "./MyAccount.css";

const MyAccount = () => {
  const user = JSON.parse(localStorage.getItem("user"));

 

  return (
    <div className="account-overlay">

      <div className="account-modal">

        {/* LEFT SIDE */}
        <div className="account-sidebar">
          <h2>Account</h2>
          <p className="subtitle">Manage your account info.</p>

          <div className="menu active">
            👤 Profile
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="account-content">

          <h2>Profile Details</h2>

          <div className="account-field">
            <label>Full Name</label>
            <div className="field-box">{user.fullName}</div>
          </div>

          <div className="account-field">
            <label>Email address</label>
            <div className="field-box">
              {user.email}
            
            </div>
          </div>

          <div className="account-field">
            <label>Username</label>
            <div className="field-box">{user.username}</div>
          </div>

          <div className="account-field">
            <label>Phone</label>
            <div className="field-box">{user.phone}</div>
          </div>

          <div className="account-field">
            <label>Gender</label>
            <div className="field-box">{user.gender}</div>
          </div>

          <div className="account-field">
            <label>Blood Group</label>
            <div className="field-box">{user.bloodGroup}</div>
          </div>

          <div className="account-field">
            <label>Date of Birth</label>
            <div className="field-box">{new Date(user.dob).toLocaleDateString("en-GB")}</div>
          </div>

          <div className="account-field">
            <label>Address</label>
            <div className="field-box">{user.address}</div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MyAccount;