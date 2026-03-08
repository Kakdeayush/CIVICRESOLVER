import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img src="/img/logo2.jpg" alt="Logo" className="navbar-logo" />
        <span className="navbar-title">CivicResolver</span>
      </div>

      {/* CENTER */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li onClick={closeMenu}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onClick={closeMenu}>
          <NavLink to="/track-report">Track Report</NavLink>
        </li>
        <li onClick={closeMenu}>
          <NavLink to="/gallery">Gallery</NavLink>
        </li>
        <li onClick={closeMenu}>
          <NavLink to="/about">About Us</NavLink>
        </li>
      </ul>

      {/* RIGHT */}
      <div className="navbar-right">
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {!user ? (
      <button
      className="get-started-btn"
      onClick={() => navigate("/login")}
      >
      Get Started
     </button>
     ) : (
   <div
  
>
<div
  className="profile-avatar"
  onClick={() => navigate("/profile")}
>
  <img src="/img/profile.png" alt="Profile" className="profile-img" />
</div>
</div>

     )}


        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
