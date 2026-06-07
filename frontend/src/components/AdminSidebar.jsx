import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../i18n/LanguageContext";

const AdminSidebar = ({ theme, toggleTheme }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    alert(t("admin.sidebar.loggedOut"));
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">CivicResolver</h2>

      <nav>
        <NavLink to="/admin" end>📊 {t("admin.sidebar.dashboard")}</NavLink>
        <NavLink to="/admin/complaints">📝 {t("admin.sidebar.complaints")}</NavLink>
        <NavLink to="/admin/suggestions">💡 {t("admin.sidebar.suggestions")}</NavLink>
        <NavLink to="/admin/analytics">📈 {t("admin.sidebar.analytics")}</NavLink>
        <NavLink to="/admin/reports">📋 Reports</NavLink>
        <NavLink to="/admin/settings">⚙️ {t("admin.sidebar.settings")}</NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="theme-icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>


        <button className="logout-btn" onClick={handleLogout}>
          🚪 {t("admin.sidebar.logout")}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
