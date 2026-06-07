import "../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useLanguage } from "../i18n/LanguageContext";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

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

      alert(t("auth.register.successAlert"));
      navigate("/login");
    } catch {
      setError(t("auth.register.failure"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">{t("auth.register.title")}</h1>
        <p className="auth-subtitle">{t("auth.register.subtitle")}</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="input-group">
          <label>{t("auth.register.nameLabel")}</label>
          <div className="input-box">
            <input
              type="text"
              placeholder={t("auth.register.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>{t("auth.register.emailLabel")}</label>
          <div className="input-box">
            <input
              type="email"
              placeholder={t("auth.register.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label>{t("auth.register.passwordLabel")}</label>
          <div className="input-box">
            <input
              type="password"
              placeholder={t("auth.register.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-toggle">👁</span>
          </div>
        </div>

        <button className="auth-btn" onClick={handleRegister} type="button">
          {t("auth.register.submit")}
        </button>

        <p className="auth-footer">
          {t("auth.register.haveAccount")}{" "}
          <span onClick={() => navigate("/login")}>{t("auth.register.login")}</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
