import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { useAuth } from "../context/AuthContext";
import { LANGUAGE_OPTIONS, useLanguage } from "../i18n/LanguageContext";

const THEME_STORAGE_KEY = "civicresolver-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Ignore storage issues and use the system preference instead.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const Navbar = () => {
  const [theme, setTheme] = useState(() => getInitialTheme());
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const body = document.body;

    body.classList.remove("light", "dark");
    body.classList.add(theme);
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage issues.
    }
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <button
          type="button"
          className="navbar-left"
          onClick={() => {
            closeMenu();
            navigate("/");
          }}
          aria-label={t("nav.home")}
        >
          <img src="/img/logo2.jpg" alt="CivicResolver logo" className="navbar-logo" />
          <span className="navbar-brand-copy">
            <span className="navbar-title">CivicResolver</span>
            <span className="navbar-subtitle">{t("footer.tagline")}</span>
          </span>
        </button>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMenu}
            >
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/track-report"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMenu}
            >
              {t("nav.trackReport")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/suggestions"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMenu}
            >
              {t("nav.suggestions")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMenu}
            >
              {t("nav.gallery")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={closeMenu}
            >
              {t("nav.about")}
            </NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          <label className="language-switcher" aria-label={t("language.label")}>
            <span className="language-switcher-label">{t("language.label")}</span>
            <select
              className="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? t("nav.switchThemeToDark") : t("nav.switchThemeToLight")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {!user ? (
            <button
              type="button"
              className="get-started-btn"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              {t("nav.getStarted")}
            </button>
          ) : (
            <button
              type="button"
              className="profile-avatar"
              onClick={() => {
                closeMenu();
                navigate("/profile");
              }}
              aria-label={t("nav.profile")}
            >
              <span className="profile-emoji">👤</span>
            </button>
          )}

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div
        className={`navbar-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Navbar;
