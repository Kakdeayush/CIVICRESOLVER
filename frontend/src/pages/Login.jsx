import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/css/auth.css";
import { loginUser } from "../api/authApi";
import { useLanguage } from "../i18n/LanguageContext";

const Login = () => {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = async () => {
    setError("");

    const payload = {
      email,
      password,
    };

    try {
      const res = await loginUser(payload);

      localStorage.setItem("token", res.data.token);

      login({
        name: res.data.user.name,
        role: res.data.user.role.toLowerCase(),
        email: res.data.user.email,
      });

      if (res.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      setError(t("auth.login.invalid"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>{t("auth.login.title")}</h1>
        <p className="subtitle">{t("auth.login.subtitle")}</p>

        <div className="role-toggle">
          <button
            className={role === "citizen" ? "active" : ""}
            onClick={() => setRole("citizen")}
            type="button"
          >
            👤 {t("auth.login.citizen")}
          </button>

          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
            type="button"
          >
            📱 {t("auth.login.admin")}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-group">
          <label>{t("auth.login.emailLabel")}</label>
          <div className="input-box">
            <span>📧</span>
            <input
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>{t("auth.login.passwordLabel")}</label>
          <div className="input-box">
            <span>🔒</span>
            <input
              type="password"
              placeholder={t("auth.login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye">👁️</span>
          </div>
        </div>

        <div className="options">
          <label>
            <input type="checkbox" /> {t("auth.login.remember")}
          </label>

          <p className="forgot-link" onClick={() => navigate("/forgot-password")}>
            {t("auth.login.forgot")}
          </p>
        </div>

        <button className="signin-btn" onClick={handleLogin} type="button">
          {t("auth.login.submit")}
        </button>

        <p className="signup-text">
          {t("auth.login.noAccount")}{" "}
          <span onClick={() => navigate("/register")}>{t("auth.login.signUp")}</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
