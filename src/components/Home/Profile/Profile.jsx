import React, { useState } from "react";
import profileimg from "../../../assets/profileimg.png";
import { IoSettings } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import "./Profile.css";

const Profile = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="profile">

      {/* Avatar */}
      <img
        className="avatar"
        src={profileimg}
        alt="user"
        onClick={() => setShow(!show)}
      />

      {/* Dropdown */}
      {show && (
        <div className="dropdown">

          {/* User Info */}
          <div className="user">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="user"
            />
            <div>
              <h4>Meet Doshi</h4>
              <p>meetdoshi027@gmail.com</p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Buttons */}
          <button className="account"><IoSettings className="proicon" /> My Account</button>
          <button className="logout"><PiSignOutBold className="proicon" /> Sign Out</button>

        </div>
      )}
    </div>
  );
};

export default Profile;