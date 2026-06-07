import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";
import { useLanguage } from "../i18n/LanguageContext";

const createHeroActions = (t) => [
  {
    title: t("home.actions.report.title"),
    icon: "📷",
    path: "/report",
    summary: t("home.actions.report.summary"),
    badge: t("home.actions.report.badge"),
    detail: t("home.actions.report.detail"),
    details: t("home.actions.report.points"),
  },
  {
    title: t("home.actions.track.title"),
    icon: "🛰️",
    path: "/track-report",
    summary: t("home.actions.track.summary"),
    badge: t("home.actions.track.badge"),
    detail: t("home.actions.track.detail"),
    details: t("home.actions.track.points"),
  },
  {
    title: t("home.actions.suggest.title"),
    icon: "💡",
    path: "/suggestions",
    summary: t("home.actions.suggest.summary"),
    badge: t("home.actions.suggest.badge"),
    detail: t("home.actions.suggest.detail"),
    details: t("home.actions.suggest.points"),
  },
];

const createImpactCards = (t) => [
  {
    icon: "📍",
    title: t("home.impact.location.title"),
    description: t("home.impact.location.description"),
  },
  {
    icon: "⚡",
    title: t("home.impact.actions.title"),
    description: t("home.impact.actions.description"),
  },
  {
    icon: "🤝",
    title: t("home.impact.visibility.title"),
    description: t("home.impact.visibility.description"),
  },
];

const createProblemItems = (t) => [
  {
    number: "1",
    title: t("home.problems.items.complex.title"),
    description: t("home.problems.items.complex.description"),
  },
  {
    number: "2",
    title: t("home.problems.items.transparency.title"),
    description: t("home.problems.items.transparency.description"),
  },
  {
    number: "3",
    title: t("home.problems.items.slow.title"),
    description: t("home.problems.items.slow.description"),
  },
];

const createFeatureCards = (t) => [
  {
    icon: "📍",
    title: t("home.features.items.tracking.title"),
    description: t("home.features.items.tracking.description"),
  },
  {
    icon: "⏱️",
    title: t("home.features.items.response.title"),
    description: t("home.features.items.response.description"),
  },
  {
    icon: "🔒",
    title: t("home.features.items.security.title"),
    description: t("home.features.items.security.description"),
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeAction, setActiveAction] = useState(0);

  const heroActions = createHeroActions(t);
  const impactCards = createImpactCards(t);
  const problemItems = createProblemItems(t);
  const featureCards = createFeatureCards(t);
  const selectedAction = heroActions[activeAction];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">{t("home.hero.kicker")}</span>

            <h1 className="hero-title">
              <span className="title-normal">{t("home.hero.titleLead")} </span>
              <span className="title-gradient">{t("home.hero.titleAccent")}</span>
            </h1>

            <p className="hero-description">{t("home.hero.description")}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="report-btn"
                onClick={() => navigate("/report")}
              >
                {t("home.hero.primaryAction")}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/gallery")}
              >
                {t("home.hero.secondaryAction")}
              </button>
            </div>

            <div className="hero-pills" aria-label={t("home.hero.panel.eyebrow")}>
              <span>{t("home.hero.pills.photo")}</span>
              <span>{t("home.hero.pills.map")}</span>
              <span>{t("home.hero.pills.status")}</span>
            </div>
          </div>

          <div className="hero-panel surface-card">
            <div className="panel-header">
              <div>
                <p className="panel-eyebrow">{t("home.hero.panel.eyebrow")}</p>
                <h2>{t("home.hero.panel.title")}</h2>
              </div>
              <span className="panel-live">{t("home.hero.panel.live")}</span>
            </div>

            <div className="journey-list">
              {heroActions.map((action, index) => (
                <button
                  type="button"
                  key={action.title}
                  className={`journey-card ${activeAction === index ? "active" : ""}`}
                  onMouseEnter={() => setActiveAction(index)}
                  onFocus={() => setActiveAction(index)}
                  onClick={() => navigate(action.path)}
                >
                  <span className="journey-icon">{action.icon}</span>
                  <span className="journey-body">
                    <strong>{action.title}</strong>
                    <span>{action.summary}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="journey-preview">
              <p className="preview-label">{selectedAction.badge}</p>
              <h3>{selectedAction.title}</h3>
              <p>{selectedAction.detail}</p>
              <ul>
                {selectedAction.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-strip">
        {impactCards.map((card) => (
          <article key={card.title} className="impact-card surface-card">
            <span className="impact-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </section>

      <section className="problems-section">
        <div className="problems-wrapper">
          <div className="problems-header">
            <h2 className="section-title">{t("home.problems.title")}</h2>
            <p className="section-description">{t("home.problems.description")}</p>
          </div>

          <div className="problems-box">
            <div className="problem-list">
              {problemItems.map((item) => (
                <div className="problem-item" key={item.number}>
                  <div className="problem-number">{item.number}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="solution-box">
              <h3>{t("home.problems.solution.title")}</h3>
              <ul>
                {t("home.problems.solution.points").map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">{t("home.features.title")}</h2>
        <p className="features-subtitle">{t("home.features.subtitle")}</p>

        <div className="features-grid">
          {featureCards.map((card) => (
            <div className="feature-card" key={card.title}>
              <div className="feature-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <span className="section-eyebrow">{t("home.cta.eyebrow")}</span>
          <h2>{t("home.cta.title")}</h2>
          <p>{t("home.cta.description")}</p>
          <div className="cta-actions">
            <button className="cta-btn" onClick={() => navigate("/login")}>
              {t("home.cta.primaryAction")}
            </button>
            <button className="cta-secondary" onClick={() => navigate("/about")}>
              {t("home.cta.secondaryAction")}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
