import React from "react";
import "./MyAccount.css";

const HospitalAccount = () => {

  const hospital = JSON.parse(localStorage.getItem("orgData"));

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
          <h2>Hospital Details</h2>

          <div className="account-field">
            <label>Hospital Name</label>
            <div className="field-box">{hospital.hospitalName}</div>
          </div>

          <div className="account-field">
            <label>Email</label>
            <div className="field-box">{hospital.email}</div>
          </div>

           <div className="account-field">
            <label>Username</label>
            <div className="field-box">{hospital.username}</div>
          </div>

          <div className="account-field">
            <label>Phone</label>
            <div className="field-box">{hospital.phone}</div>
          </div>

          <div className="account-field">
            <label>City</label>
            <div className="field-box">{hospital.city}</div>
          </div>

          <div className="account-field">
            <label>Address</label>
            <div className="field-box">{hospital.address}</div>
          </div>

          <div className="account-field">
            <label>Registration Number</label>
            <div className="field-box">{hospital.registrationNumber}</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HospitalAccount;