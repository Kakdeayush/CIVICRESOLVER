import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/forgotpassword.css";
import { useLanguage } from "../i18n/LanguageContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">{t("auth.forgot.title")}</h1>

        {!sent ? (
          <>
            <p className="auth-subtitle">{t("auth.forgot.subtitle")}</p>

            <div className="input-group">
              <label>{t("auth.forgot.emailLabel")}</label>
              <div className="input-box">
                <input
                  type="email"
                  placeholder={t("auth.forgot.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button className="auth-btn" onClick={handleSubmit} type="button">
              {t("auth.forgot.submit")}
            </button>
          </>
        ) : (
          <>
            <p className="auth-subtitle success-text">{t("auth.forgot.success")}</p>

            <button className="auth-btn" onClick={() => navigate("/login")} type="button">
              {t("auth.forgot.backToLogin")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
