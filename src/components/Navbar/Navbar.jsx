// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../../assets/logo.jpg";
// import maleImg from "../../assets/profileimage.png";
// import femaleImg from "../../assets/profileimage1.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [showMenu, setShowMenu] = useState(false);

//   const logout = () => {
//     sessionStorage.removeItem("user");
//     navigate("/login");
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="navbar-custom">

//       {/* LOGO */}
//       <div className="logo-section">
//         <img src={logo} alt="logo" />
//         <h2>Connect Life</h2>
//       </div>

//       {/* NAV LINKS */}
//       <ul className="nav-links">

//         <li className={isActive("/home") ? "active" : ""}>
//           <Link to="/home">Home</Link>
//         </li>

//         <li className={isActive("/bloodrequest") ? "active" : ""}>
//           <Link to="/bloodrequest">Request Blood</Link>
//         </li>

//         <li className={isActive("/donate") ? "active" : ""}>
//           <Link to="/donate">Donate</Link>
//         </li>

//         <li className={isActive("/event") ? "active" : ""}>
//           <Link to="/event">Event</Link>
//         </li>

//         <li className={isActive("/aboutus") ? "active" : ""}>
//           <Link to="/aboutus">About</Link>
//         </li>

//         <li className={isActive("/contactus") ? "active" : ""}>
//           <Link to="/contactus">Contact</Link>
//         </li>

//       </ul>

//       {/* RIGHT SIDE */}
//       <div className="nav-right">

//         {!user && (
//           <button className="login-btn" onClick={() => navigate("/login")}>
//             Login
//           </button>
//         )}

//         {user && (
//           <div className="profile">
//             <img
//               src={
//                 user?.gender?.toLowerCase() === "female"
//                   ? femaleImg
//                   : maleImg
//               }
//               alt="profile"
//               onClick={() => setShowMenu(!showMenu)}
//             />

//             {showMenu && (
//               <div className="dropdown-box">
//                 <h5>{user.fullName}</h5>
//                 <p>{user.email}</p>

//                 <button onClick={() => navigate("/account")}>
//                   My Account
//                 </button>

//                 <button className="logout" onClick={logout}>
//                   Sign Out
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import maleImg from "../../assets/profileimage.png";
import femaleImg from "../../assets/profileimage1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("user");
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

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>

        <li className={isActive("/home") ? "active" : ""}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>

        <li className={isActive("/bloodrequest") ? "active" : ""}>
          <Link to="/bloodrequest" onClick={() => setMenuOpen(false)}>Request Blood</Link>
        </li>

        <li className={isActive("/donate") ? "active" : ""}>
          <Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link>
        </li>

        <li className={isActive("/event") ? "active" : ""}>
          <Link to="/event" onClick={() => setMenuOpen(false)}>Event</Link>
        </li>

        <li className={isActive("/aboutus") ? "active" : ""}>
          <Link to="/aboutus" onClick={() => setMenuOpen(false)}>About</Link>
        </li>

        <li className={isActive("/contactus") ? "active" : ""}>
          <Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact</Link>
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