import "../assets/css/about.css";

const About = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1 className="hero-title">
          Welcome to <span className="brand-text">CivicResolver</span>
        </h1>

        <p>
          A citizen-powered platform helping communities report,
          track, and resolve civic issues transparently.
        </p>
      </section>

      {/* HERO IMAGE */}
      <section className="about-image-section">
        <img
          src="/img/city10.jpg"
          alt="Smart city civic management"
        />
      </section>

      {/* MISSION & VISION */}
      <section className="about-cards">
        <div className="about-card">
          <img
            src="/img/city4.jpeg"
            alt="City infrastructure"
          />
          <h2>Our Mission</h2>
          <p>
            To empower citizens to report civic issues easily and ensure
            faster resolution through transparency and technology.
          </p>
        </div>

        <div className="about-card">
          <img
            src="/img/city14.jpg"
            alt="Modern city vision"
          />
          <h2>Our Vision</h2>
          <p>
            To build smarter, cleaner, and more responsive cities where
            every citizen’s voice creates real change.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="about-features">
        <h2>Why Choose CivicResolver</h2>

        <div className="features-grid">
          <div className="feature-item">
            <span>📍</span>
            <h3>Location-Based Reporting</h3>
            <p>Pinpoint issues accurately using maps.</p>
          </div>

          <div className="feature-item">
            <span>🔍</span>
            <h3>Transparent Tracking</h3>
            <p>Track complaint status in real time.</p>
          </div>

          <div className="feature-item">
            <span>🤝</span>
            <h3>Citizen Empowerment</h3>
            <p>Your voice directly improves your city.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;