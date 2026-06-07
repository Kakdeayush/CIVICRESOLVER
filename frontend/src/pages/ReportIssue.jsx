import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "../assets/css/reportIssue.css";
import { createComplaint } from "../api/complaintApi";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { COMPLAINT_CATEGORY_CODES } from "../i18n/constants";
import { useLanguage } from "../i18n/LanguageContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DEFAULT_LOCATION = { lat: 19.9526, lng: 79.2952 };

function LocationPicker({ setLocation, setLocationName, fallbackLocationName }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setLocation(e.latlng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        setLocationName(data.display_name || fallbackLocationName);
      } catch {
        setLocationName(fallbackLocationName);
      }
    },
  });

  return null;
}

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ROAD");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locationName, setLocationName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { t, translateComplaintCategory } = useLanguage();

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "civicresolver");
    formData.append("folder", "complaints");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzynoz4dd/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !category || !description || !locationName) {
      setError(t("report.errorFill"));
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary();

      await createComplaint({
        title,
        category,
        description,
        location: locationName,
        imageUrl,
      });

      alert(t("report.success"));
      navigate("/track-report");
    } catch {
      setError(t("report.errorSubmit"));
    }
  };

  return (
    <div className="report-page">
      <h1 className="report-title">{t("report.title")}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="report-form" onSubmit={handleSubmit}>
        <label>{t("report.issueTitle")}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>{t("report.category")}</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {COMPLAINT_CATEGORY_CODES.map((code) => (
            <option key={code} value={code}>
              {translateComplaintCategory(code)}
            </option>
          ))}
        </select>

        <label>{t("report.description")}</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>{t("report.selectLocation")}</label>
        {locationName && <p>📍 {locationName}</p>}

        <div className="map-box">
          <MapContainer center={DEFAULT_LOCATION} zoom={13} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} />
            <LocationPicker
              setLocation={setLocation}
              setLocationName={setLocationName}
              fallbackLocationName={t("report.locationFallback")}
            />
          </MapContainer>
        </div>

        <label>{t("report.uploadPhoto")}</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit" className="submit-btn">
          {t("report.submit")}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
