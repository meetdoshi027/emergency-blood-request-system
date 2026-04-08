import React from "react";
import "./MyAccount.css";

const BloodbankAccount = () => {

  const bloodbank = JSON.parse(localStorage.getItem("orgData"));

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

        {/* RIGHT */}
        <div className="account-content">
          <h2>Blood Bank Details</h2>

          <div className="account-field">
            <label>Blood Bank Name</label>
            <div className="field-box">{bloodbank.bankName}</div>
          </div>

          <div className="account-field">
            <label>Email</label>
            <div className="field-box">{bloodbank.email}</div>
          </div>

          <div className="account-field">
            <label>Username</label>
            <div className="field-box">{bloodbank.username}</div>
          </div>

          <div className="account-field">
            <label>Phone</label>
            <div className="field-box">{bloodbank.phone}</div>
          </div>

          <div className="account-field">
            <label>City</label>
            <div className="field-box">{bloodbank.city}</div>
          </div>

          <div className="account-field">
            <label>Address</label>
            <div className="field-box">{bloodbank.address}</div>
          </div>

          <div className="account-field">
            <label>License Number</label>
            <div className="field-box">{bloodbank.licenseNumber}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BloodbankAccount;