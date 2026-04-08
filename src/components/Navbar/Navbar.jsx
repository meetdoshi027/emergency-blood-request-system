// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './Navbar.css';
// import logo from '../../assets/logo.jpg';
// import maleImg from "../../assets/profileimage.png";   
// import femaleImg from "../../assets/profileimage1.png"; 

// const Navbar = () => {

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [showMenu, setShowMenu] = useState(false);

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-md navbar-light bg-light">
//       <div className="container-fluid">

//         <img src={logo} className="navlogo" alt="logo" />
//         <Link className="navbar-brand navtit" to="/home">Connect Life</Link>

//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav ms-auto">

//             <li className="nav-item">
//               <Link className="nav-link" to="/home">Home</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/bloodrequest">Request Blood</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/donate">Donate</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/event">Event</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/aboutus">About</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/contactus">Contact</Link>
//             </li>

//             {/* ✅ LOGIN */}
//             {!user && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/login">LOGIN</Link>
//               </li>
//             )}

//             {/* ✅ PROFILE */}
//             {user && (
//   <li className="nav-item profile">
//     <img
//       src={
//         user?.gender?.toLowerCase() === "female"
//           ? femaleImg
//           : maleImg
//       }
//       alt="profile"
//       onClick={() => setShowMenu(!showMenu)}
//     />

//     {showMenu && (
//       <div className="dropdown-box">
//         <h5>{user.fullName}</h5>
//         <p>{user.email}</p>

//         <button onClick={() => navigate("/account")}>
//           My Account
//         </button>

//         <button className="logout" onClick={logout}>
//           Sign Out
//         </button>
//       </div>
//     )}
//   </li>
// )}

//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import maleImg from "../../assets/profileimage.png";
import femaleImg from "../../assets/profileimage1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">

      {/* LOGO */}
      <div className="logo-section">
        <img src={logo} alt="logo" />
        <h2>Connect Life</h2>
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">

        <li className={isActive("/home") ? "active" : ""}>
          <Link to="/home">Home</Link>
        </li>

        <li className={isActive("/bloodrequest") ? "active" : ""}>
          <Link to="/bloodrequest">Request Blood</Link>
        </li>

        <li className={isActive("/donate") ? "active" : ""}>
          <Link to="/donate">Donate</Link>
        </li>

        <li className={isActive("/event") ? "active" : ""}>
          <Link to="/event">Event</Link>
        </li>

        <li className={isActive("/aboutus") ? "active" : ""}>
          <Link to="/aboutus">About</Link>
        </li>

        <li className={isActive("/contactus") ? "active" : ""}>
          <Link to="/contactus">Contact</Link>
        </li>

      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {!user && (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        {user && (
          <div className="profile">
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
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;