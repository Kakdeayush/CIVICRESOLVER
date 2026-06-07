import "../assets/css/about.css";
import { useLanguage } from "../i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1 className="hero-title">
          {t("about.heroTitleLead")} <span className="brand-text">{t("about.heroTitleAccent")}</span>
        </h1>

        <p>{t("about.heroDescription")}</p>
      </section>

      <section className="about-image-section">
        <img src="/img/city10.jpg" alt={t("about.heroTitleAccent")} />
      </section>

      <section className="about-cards">
        <div className="about-card">
          <img src="/img/city4.jpeg" alt={t("about.missionTitle")} />
          <h2>{t("about.missionTitle")}</h2>
          <p>{t("about.missionDescription")}</p>
        </div>

        <div className="about-card">
          <img src="/img/city14.jpg" alt={t("about.visionTitle")} />
          <h2>{t("about.visionTitle")}</h2>
          <p>{t("about.visionDescription")}</p>
        </div>
      </section>

      <section className="about-features">
        <h2>{t("about.whyTitle")}</h2>

        <div className="features-grid">
          <div className="feature-item">
            <span>📍</span>
            <h3>{t("about.features.location.title")}</h3>
            <p>{t("about.features.location.description")}</p>
          </div>

          <div className="feature-item">
            <span>🔍</span>
            <h3>{t("about.features.transparent.title")}</h3>
            <p>{t("about.features.transparent.description")}</p>
          </div>

          <div className="feature-item">
            <span>🤝</span>
            <h3>{t("about.features.empowerment.title")}</h3>
            <p>{t("about.features.empowerment.description")}</p>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div>
          <h3>{t("about.stats.fast.title")}</h3>
          <p>{t("about.stats.fast.description")}</p>
        </div>

        <div>
          <h3>{t("about.stats.realtime.title")}</h3>
          <p>{t("about.stats.realtime.description")}</p>
        </div>

        <div>
          <h3>{t("about.stats.community.title")}</h3>
          <p>{t("about.stats.community.description")}</p>
        </div>
      </section>
    </div>
  );
};

export default About;
