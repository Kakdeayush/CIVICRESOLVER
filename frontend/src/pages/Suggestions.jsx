import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/css/suggestions.css";
import { createSuggestion, getMySuggestions } from "../api/suggestionApi";
import L from "leaflet";
import { SUGGESTION_CATEGORY_CODES } from "../i18n/constants";
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

const INITIAL_FORM = {
  title: "",
  category: "TRANSPORT",
  description: "",
  area: "",
  latitude: "",
  longitude: "",
};

const DEFAULT_LOCATION = { lat: 19.9526, lng: 79.2952 };

function SuggestionLocationPicker({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng);
    },
  });

  return null;
}

const Suggestions = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mapLocation, setMapLocation] = useState(null);
  const { t, translateSuggestionCategory, translateSuggestionStatus, formatDateTime } =
    useLanguage();

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        setLoading(true);
        const res = await getMySuggestions();
        setSuggestions(res.data);
      } catch {
        setError(t("suggestions.loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadSuggestions();
  }, [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "latitude" || name === "longitude") {
        const lat = Number(next.latitude);
        const lng = Number(next.longitude);

        if (
          !Number.isNaN(lat) &&
          !Number.isNaN(lng) &&
          lat >= -90 &&
          lat <= 90 &&
          lng >= -180 &&
          lng <= 180
        ) {
          setMapLocation({ lat, lng });
        }
      }

      return next;
    });
  };

  const handleMapPick = (latlng) => {
    setMapLocation(latlng);
    setForm((prev) => ({
      ...prev,
      latitude: latlng.lat.toFixed(5),
      longitude: latlng.lng.toFixed(5),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const latitudeValue = form.latitude.trim();
    const longitudeValue = form.longitude.trim();

    if ((latitudeValue && !longitudeValue) || (!latitudeValue && longitudeValue)) {
      setError(t("suggestions.validationBoth"));
      return;
    }

    let latitude;
    let longitude;

    if (latitudeValue && longitudeValue) {
      latitude = Number(latitudeValue);
      longitude = Number(longitudeValue);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        setError(t("suggestions.validationNumbers"));
        return;
      }

      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        setError(t("suggestions.validationRange"));
        return;
      }
    }

    const payload = {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      area: form.area.trim(),
    };

    if (latitude !== undefined && longitude !== undefined) {
      payload.latitude = latitude;
      payload.longitude = longitude;
    }

    if (!payload.title || !payload.description || !payload.area) {
      setError(t("suggestions.validationRequired"));
      return;
    }

    try {
      setSubmitting(true);
      await createSuggestion(payload);
      setSuccess(t("suggestions.success"));
      setForm((prev) => ({ ...INITIAL_FORM, category: prev.category }));
      setMapLocation(null);
      const res = await getMySuggestions();
      setSuggestions(res.data);
    } catch {
      setError(t("suggestions.submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="suggestion-page">
      <h1 className="suggestion-title">{t("suggestions.title")}</h1>
      <p className="suggestion-subtitle">{t("suggestions.subtitle")}</p>

      <div className="suggestion-grid">
        <section className="suggestion-form-card">
          <h2>{t("suggestions.submitTitle")}</h2>
          {error && <p className="suggestion-error">{error}</p>}
          {success && <p className="suggestion-success">{success}</p>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">{t("suggestions.titleLabel")}</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder={t("suggestions.titlePlaceholder")}
            />

            <label htmlFor="category">{t("suggestions.categoryLabel")}</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {SUGGESTION_CATEGORY_CODES.map((code) => (
                <option key={code} value={code}>
                  {translateSuggestionCategory(code)}
                </option>
              ))}
            </select>

            <label htmlFor="description">{t("suggestions.descriptionLabel")}</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              placeholder={t("suggestions.descriptionPlaceholder")}
            />

            <label htmlFor="area">{t("suggestions.areaLabel")}</label>
            <input
              id="area"
              name="area"
              type="text"
              value={form.area}
              onChange={handleChange}
              placeholder={t("suggestions.areaPlaceholder")}
            />

            <div className="suggestion-geo-row">
              <div>
                <label htmlFor="latitude">{t("suggestions.latitudeLabel")}</label>
                <input
                  id="latitude"
                  name="latitude"
                  type="text"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder={t("suggestions.latitudePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="longitude">{t("suggestions.longitudeLabel")}</label>
                <input
                  id="longitude"
                  name="longitude"
                  type="text"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder={t("suggestions.longitudePlaceholder")}
                />
              </div>
            </div>

            <label>{t("suggestions.mapLabel")}</label>
            {mapLocation && (
              <p className="suggestion-geo-preview">
                {t("suggestions.selectedLabel")}: {mapLocation.lat.toFixed(5)},{" "}
                {mapLocation.lng.toFixed(5)}
              </p>
            )}
            <div className="suggestion-map-box">
              <MapContainer
                center={mapLocation || DEFAULT_LOCATION}
                zoom={13}
                className="suggestion-map"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {mapLocation && <Marker position={mapLocation} />}
                <SuggestionLocationPicker onPick={handleMapPick} />
              </MapContainer>
            </div>

            <button type="submit" disabled={submitting}>
              {submitting ? t("suggestions.submitting") : t("suggestions.submit")}
            </button>
          </form>
        </section>

        <section className="suggestion-list-card">
          <h2>{t("suggestions.listTitle")}</h2>
          {loading && <p>{t("suggestions.loading")}</p>}
          {!loading && suggestions.length === 0 && <p>{t("suggestions.empty")}</p>}

          <div className="suggestion-list">
            {suggestions.map((item) => (
              <article key={item.id} className="suggestion-item">
                <div className="suggestion-item-header">
                  <h3>{item.title}</h3>
                  <div className="suggestion-badges">
                    <span className="suggestion-category">
                      {translateSuggestionCategory(item.category)}
                    </span>
                    <span
                      className={`suggestion-status-badge ${String(
                        item.status
                      )
                        .toLowerCase()
                        .replaceAll("_", "-")}`}
                    >
                      {translateSuggestionStatus(item.status)}
                    </span>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="suggestion-meta">
                  <span>{item.area}</span>
                  {item.latitude !== null &&
                    item.latitude !== undefined &&
                    item.longitude !== null &&
                    item.longitude !== undefined && (
                      <span>
                        {t("common.geoTag")}: {Number(item.latitude).toFixed(5)}, {Number(item.longitude).toFixed(5)}
                      </span>
                    )}
                  <span>{formatDateTime(item.createdAt, { dateStyle: "medium", timeStyle: "short" })}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Suggestions;
