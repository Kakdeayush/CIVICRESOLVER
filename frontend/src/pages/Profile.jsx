import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../assets/css/profile.css";
import { useLanguage } from "../i18n/LanguageContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, translateRole } = useLanguage();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-avatar">👤</div>

        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-role">{translateRole(user.role)}</p>

        <div className="profile-info">
          <div className="info-row">
            <span>{t("profile.emailLabel")}</span>
            <span>{user.email || t("common.notProvided")}</span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
          type="button"
        >
          {t("profile.logout")}
        </button>
      </div>
    </div>
  );
};

export default Profile;
