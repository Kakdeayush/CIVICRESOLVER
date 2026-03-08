import "../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    try {
      await registerUser({
        name,
        email,
        password,
        role: "CITIZEN",
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Join us and start making a difference
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="input-group">
          <label>Full Name</label>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-box">
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-toggle">👁</span>
          </div>
        </div>

        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
