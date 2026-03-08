import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminSidebar = ({ theme, toggleTheme }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("You are logged out");
    navigate("/");
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">CivicResolver</h2>

      <nav>
        <NavLink to="/admin" end>📊 Dashboard</NavLink>
        <NavLink to="/admin/complaints">📝 Complaints</NavLink>
        <NavLink to="/admin/analytics">📈 Analytics</NavLink>
        <NavLink to="/admin/settings">⚙️ Settings</NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button className="theme-icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>


        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
