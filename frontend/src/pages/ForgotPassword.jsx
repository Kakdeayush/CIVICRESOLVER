import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/forgotpassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Forgot Password</h1>

        {!sent ? (
          <>
            <p className="auth-subtitle">
              Enter your email and we’ll send you a reset link
            </p>

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

            <button className="auth-btn" onClick={handleSubmit}>
              Send Reset Link
            </button>
          </>
        ) : (
          <>
            <p className="auth-subtitle success-text">
              ✅ Reset link sent to your email
            </p>

            <button
              className="auth-btn"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
