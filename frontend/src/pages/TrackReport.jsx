import "../assets/css/trackReport.css";
import { useEffect, useState } from "react";
import { getMyComplaints } from "../api/complaintApi";
import { useLanguage } from "../i18n/LanguageContext";

const TrackReport = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const { t, translateComplaintCategory, translateComplaintStatus, formatDateTime } =
    useLanguage();

  useEffect(() => {
    const fetchComplaints = async () => {
      setError("");
      try {
        const res = await getMyComplaints();
        setComplaints(res.data);
      } catch {
        setError(t("track.error"));
      }
    };

    fetchComplaints();
  }, [t]);

  return (
    <div className="track-page">
      <h1 className="track-title">{t("track.title")}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="complaint-list">
        {complaints.length === 0 && !error && <p>{t("track.empty")}</p>}

        {complaints.map((item) => (
          <div className="complaint-card" key={item.id}>
            <div className="card-header">
              <h2>{item.title}</h2>
              <span className={`status ${String(item.status).toLowerCase()}`}>
                {translateComplaintStatus(item.status)}
              </span>
            </div>

            <p className="complaint-id">
              {t("track.complaintId")}: {item.id}
            </p>

            <div className="card-body">
              <p>
                <strong>{t("track.category")}:</strong>{" "}
                {translateComplaintCategory(item.category)}
              </p>
              <p>
                <strong>{t("track.description")}:</strong> {item.description}
              </p>
              <p>
                <strong>{t("track.location")}:</strong> {item.location}
              </p>
              <p>
                <strong>{t("track.date")}:</strong>{" "}
                {formatDateTime(item.createdAt, {
                  dateStyle: "medium",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackReport;
