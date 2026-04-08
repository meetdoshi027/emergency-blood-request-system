import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from '../../assets/logo.jpg';
import maleImg from "../../assets/profileimage.png";     // your male image
import femaleImg from "../../assets/profileimage1.png"; // your female image

const Navbar = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">

        <img src={logo} className="navlogo" alt="logo" />
        <Link className="navbar-brand navtit" to="/home">Connect Life</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/bloodrequest">Request Blood</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/donate">Donate</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/event">Event</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contactus">Contact</Link>
            </li>

            {/* ✅ LOGIN */}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">LOGIN</Link>
              </li>
            )}

            {/* ✅ PROFILE */}
            {user && (
  <li className="nav-item profile">
    <img
      src={
        user?.gender?.toLowerCase() === "female"
          ? femaleImg
          : maleImg
      }
      alt="profile"
      onClick={() => setShowMenu(!showMenu)}
    />

    {showMenu && (
      <div className="dropdown-box">
        <h5>{user.fullName}</h5>
        <p>{user.email}</p>

        <button onClick={() => navigate("/account")}>
          My Account
        </button>

        <button className="logout" onClick={logout}>
          Sign Out
        </button>
      </div>
    )}
  </li>
)}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;