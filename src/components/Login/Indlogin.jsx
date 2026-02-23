import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import "./Indlogin.css";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import loginimg from "../../assets/loginimg.png";



const Indlogin = () => {
   const location = useLocation();

  /* -------- ROLE MODE -------- */
  const [isOrg, setIsOrg] = useState(
    location.state?.loginType === "organization"
  );
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //const role = isOrg ? "organization" : "individual";

  /* ---------------- SWITCH ---------------- */
  const handleSwitchChange = () => {
    setIsOrg(!isOrg);
  };

  /* ---------------- VALIDATION HELPERS ---------------- */
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

  /* ---------------- LIVE HANDLERS ---------------- */
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const errorMsg = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: errorMsg }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const errorMsg = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: errorMsg }));
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
    const response = await axios.post(
      "https://localhost:7156/api/Auth/login",
      {
        email,
        password
      }
    );

    alert(response.data.message);

    // Save login session
    localStorage.setItem("userId", response.data.userId);

    // redirect (later dashboard)
    window.location.href = "/";

  } catch (error) {
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Server error");
    }
  }
};

  return (
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
          {/* MODE SWITCH */}
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

            <div className="helper-row">
            <Link className="register-link" to={isOrg ? "/register/organization" : "/register/individual"}>
                {isOrg ? "Register Organization" : "Register as Individual"}
           </Link>
           
            <span className="forgot">Forgot Password?</span>
            </div>

            <button className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Indlogin;
