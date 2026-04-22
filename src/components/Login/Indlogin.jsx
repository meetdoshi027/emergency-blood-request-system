import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Indlogin.css";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import loginimg from "../../assets/loginimg.png";
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/footer';


const Indlogin = () => {

  const location = useLocation();
  const navigate = useNavigate();

  /* -------- ROLE MODE -------- */
  const [isOrg, setIsOrg] = useState(
    location.state?.loginType === "organization"
  );

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  /* ---------------- SWITCH ---------------- */
  const handleSwitchChange = () => {
    setIsOrg(!isOrg);
  };

  /* ---------------- VALIDATION ---------------- */
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  /* ---------------- HANDLERS ---------------- */
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  /* ---------------- SUBMIT ---------------- */
 const handleSubmit = async (e) => {
  e.preventDefault();

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError || passwordError) {
    setErrors({
      email: emailError,
      password: passwordError,
    });
    return;
  }

  try {

    const apiUrl = isOrg
      ? "https://localhost:7156/api/Organization/login"
      : "https://localhost:7156/api/Auth/login";

    const response = await axios.post(apiUrl, {
      email,
      password
    });

    alert(response.data.message);

    // ✅ STORE USER
    if (response.data.user) {
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    }

   if (response.data.type === "hospital") {
       sessionStorage.setItem("hospitalToken", response.data.token);
       sessionStorage.setItem("hospitalType", response.data.type);
       sessionStorage.setItem("hospitalData", JSON.stringify(response.data.data));

       navigate("/hospital/dashboard");
      }

      if (response.data.type === "bloodbank") {
          sessionStorage.setItem("bloodBankToken", response.data.token);
          sessionStorage.setItem("bloodBankType", response.data.type);
          sessionStorage.setItem("bloodBankData", JSON.stringify(response.data.data));

          navigate("/bloodbank/dashboard");
       }

    

  } catch (error) {

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Server error");
    }

  }
};
  return (
    <>
    <Navbar/>
    <div className="login-page">

      {/* LEFT SECTION */}
      <div className="login-left">
        <img src={loginimg} alt="Blood Donation" className="login-illustration" />
        <h1>Donate Blood, Save Lives</h1>
        <p>
          Every drop you donate gives someone a second chance at life.
          <br />
          Join thousands of donors making a difference every day.
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <div className="login-card">

          {/* SWITCH */}
          <div className="role-switch">
            <span className="role-label">
              {isOrg ? "Organization Mode" : "Individual Mode"}
            </span>

            <label className="switch">
              <input
                type="checkbox"
                checked={isOrg}
                onChange={handleSwitchChange}
                />
              <span className="slider"></span>
            </label>
          </div>

          <h3 className="login-heading">
            {isOrg ? "Organization Login" : "Individual Login"}
          </h3>

          <form onSubmit={handleSubmit} noValidate>

            {/* EMAIL */}
            <label>Email Address</label>
            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}

            {/* PASSWORD */}
            <label>Password</label>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}

            {/* LINKS */}
            <div className="helper-row">
              <Link
                className="register-link"
                to={isOrg ? "/register/organization" : "/register/individual"}
                >
                {isOrg ? "Register Organization" : "Register as Individual"}
              </Link>

              <span className="forgot">Forgot Password?</span>
            </div>

            <button className="login-btn">Login</button>

          </form>
        </div>
      </div>

    </div>
    <Footer/>
                 </>
  );
};

export default Indlogin;