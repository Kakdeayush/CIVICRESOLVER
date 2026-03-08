import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "../assets/css/admin.css";

const AdminLayout = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="admin-layout">
      <AdminSidebar
        theme={theme}
        toggleTheme={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
      />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
