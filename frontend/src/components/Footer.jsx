import { Link } from "react-router-dom";
import "../assets/css/footer.css";
import { useLanguage } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">CivicResolver</h2>
          <p className="footer-text">{t("footer.description")}</p>
          <div className="footer-pills">
            <span>{t("footer.pillFast")}</span>
            <span>{t("footer.pillTrack")}</span>
            <span>{t("footer.pillImprove")}</span>
          </div>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <div className="footer-links">
          <h3>{t("footer.quickLinks")}</h3>
          <ul>
            <li><Link to="/">{t("nav.home")}</Link></li>
            <li><Link to="/track-report">{t("nav.trackReport")}</Link></li>
            <li><Link to="/gallery">{t("nav.gallery")}</Link></li>
            <li><Link to="/about">{t("nav.about")}</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>{t("footer.contact")}</h3>
          <p>📧 support@civicresolver.com</p>
          <p>❤️ CivicResolver</p>
        </div>
      </div>

      <div className="footer-bottom">
        {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
