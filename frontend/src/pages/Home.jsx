import "../assets/css/home.css"; 
import { useNavigate } from "react-router-dom";


const Home = () => {
   const navigate = useNavigate();
  return (
    <>
     <section className="hero">
  <div className="hero-content">
   <h1 className="hero-title">
  <span className="title-normal">Welcome to </span>
  <span className="title-gradient">CivicResolver</span>
</h1>

    <button
      type="button"
      className="report-btn"
      onClick={() => navigate("/report")}
    >
      Report an Issue
    </button>
  </div>
</section>

      {/* PROBLEMS SECTION */}
      <section className="problems-section">
        <div className="problems-wrapper">
          {/* Header */}
          <div className="problems-header">
            <h2 className="section-title">Problems We Solve</h2>
            <p className="section-description">
              Traditional civic issue reporting is slow, inefficient, and lacks
              transparency.
              <br />
              Citizens often don't know where to report issues or how to track
              their resolution.
            </p>
          </div>

          {/* Content Box */}
          <div className="problems-box">
            {/* Left */}
            <div className="problem-list">
              <div className="problem-item">
                <div className="problem-number">1</div>
                <div>
                  <h3>Complex Reporting Process</h3>
                  <p>
                    Citizens struggle to find the right department and navigate
                    bureaucratic processes.
                  </p>
                </div>
              </div>

              <div className="problem-item">
                <div className="problem-number">2</div>
                <div>
                  <h3>Lack of Transparency</h3>
                  <p>
                    No visibility into complaint status or resolution timeline.
                  </p>
                </div>
              </div>

              <div className="problem-item">
                <div className="problem-number">3</div>
                <div>
                  <h3>Slow Response Times</h3>
                  <p>
                    Issues take weeks or months to resolve due to inefficient
                    routing.
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="solution-box">
              <h3>Our Solution</h3>
              <ul>
                <li>Real-time tracking and updates</li>
                <li>Mobile-first design for accessibility</li>
                <li>Transparent communication channels</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
  <h2 className="features-title">Powerful Features</h2>
  <p className="features-subtitle">
    Everything you need to report, track, and resolve civic issues efficiently.
  </p>

  <div className="features-grid">
    <div className="feature-card">
      <div className="feature-icon">📍</div>
      <h3>Real-time Tracking</h3>
      <p>
        Track your complaints from submission to resolution in real-time.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">⏱️</div>
      <h3>Quick Response</h3>
      <p>
        Get faster response times with automated department routing.
      </p>
    </div>

    <div className="feature-card">
      <div className="feature-icon">🔒</div>
      <h3>Secure Platform</h3>
      <p>
        Your data is protected with enterprise-grade security.
      </p>
    </div>
  </div>
</section>

  <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to improve your city with CivicResolver?</h2>
        <p>
          Report civic issues, track progress in real-time, and collaborate
          with authorities to make your city better.
        </p>
        <button className="cta-btn" onClick={() => navigate("/login")} >Get Started</button>
      </div>
    </section>
    </>
  );
};

export default Home;
