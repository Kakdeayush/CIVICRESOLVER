import { useEffect, useState } from "react";
import "../assets/css/gallery.css";
import api from "../api/axios";
import { COMPLAINT_CATEGORY_CODES, normalizeCode } from "../i18n/constants";
import { useLanguage } from "../i18n/LanguageContext";

const Gallery = () => {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [area, setArea] = useState("ALL");
  const [error, setError] = useState("");
  const { t, translateComplaintCategory, translateComplaintStatus } = useLanguage();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/api/complaints/public");
        setComplaints(res.data);
      } catch {
        setError(t("gallery.loadError"));
      }
    };

    fetchComplaints();
  }, [t]);

  const filteredComplaints = complaints.filter((item) => {
    const itemCategory = normalizeCode(item.category);
    const itemArea = String(item.area ?? "").trim();

    return (
      (category === "ALL" || itemCategory === category) &&
      (area === "ALL" || itemArea === area)
    );
  });

  const areaOptions = [...new Set(complaints.map((c) => c.area).filter(Boolean))];

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">{t("gallery.title")}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="ALL">{t("gallery.allCategories")}</option>
          {COMPLAINT_CATEGORY_CODES.map((code) => (
            <option key={code} value={code}>
              {translateComplaintCategory(code)}
            </option>
          ))}
        </select>

        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="ALL">{t("gallery.allAreas")}</option>
          {areaOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="gallery-grid">
        {filteredComplaints.length === 0 && <p>{t("gallery.empty")}</p>}

        {filteredComplaints.map((item) => (
          <div className="gallery-card" key={item.id}>
            <img src={item.imageUrl || "/img/city.jpeg"} alt={item.title} />

            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="card-meta">
                <span>{translateComplaintCategory(item.category)}</span>
                <span>{item.area}</span>
              </div>

              <span className={`status ${String(item.status).toLowerCase()}`}>
                {translateComplaintStatus(item.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
