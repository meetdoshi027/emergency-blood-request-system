import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">

        <img src={logo} className="navlogo" alt="logo" />
        <Link className="navbar-brand navtit" to="/">Connect Life</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item navitem">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className="nav-item navitem">
              <Link className="nav-link" to="#">Request Blood</Link>
            </li>

            <li className="nav-item navitem">
              <Link className="nav-link" to="/donate">Donate</Link>
            </li>

            <li className="nav-item navitem">
              <Link className="nav-link" to="#">Event</Link>
            </li>

            <li className="nav-item navitem">
              <Link className="nav-link" to="/aboutus">About Us</Link>
            </li>

            <li className="nav-item navitem">
              <Link className="nav-link" to="/contactus">Contact</Link>
            </li>

            <li className="nav-item navitem">
              <Link className="nav-link" to="/login">LOGIN</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
