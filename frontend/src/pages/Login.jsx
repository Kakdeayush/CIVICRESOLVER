import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css/auth.css";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async () => {
  setError("");

  // Prepare payload without role
  const payload = {
    email,
    password,
  };

  try {
    const res = await loginUser(payload);

    // Save JWT
    localStorage.setItem("token", res.data.token);

    // Save user in context
    login({
      name: res.data.user.name,
      role: res.data.user.role.toLowerCase(),
    });

    // Redirect based on role
    if (res.data.user.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (err) {
    setError("Invalid email or password");
  }
};


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to continue making a difference</p>

        {/* Role Toggle (UI only) */}
        <div className="role-toggle">
          <button
            className={role === "citizen" ? "active" : ""}
            onClick={() => setRole("citizen")}
          >
            👤 Citizen
          </button>

          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            📱 Admin
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-group">
          <label>Email Address</label>
          <div className="input-box">
            <span>📧</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye">👁️</span>
          </div>
        </div>

        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>

          <p
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </p>
        </div>

        <button className="signin-btn" onClick={handleLogin}>
          Sign In
        </button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
