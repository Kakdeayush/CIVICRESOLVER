import "../assets/css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-brand">
          <h2 className="footer-logo">CivicResolver</h2>
          <p className="footer-text">
            Empowering citizens to report civic issues and track their
            resolution through transparent and efficient governance.
          </p>
          <p className="footer-tagline">
            आवाज़ उठाओ, बदलाव लाओ
          </p>
        </div>

        {/* MIDDLE */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/track-report">Track Report</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📧 support@civicresolver.com</p>
          <p>❤️ Made for India</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2025 CivicResolver. All rights reserved. Building better cities, one report at a time.
      </div>
    </footer>
  );
};

export default Footer;
