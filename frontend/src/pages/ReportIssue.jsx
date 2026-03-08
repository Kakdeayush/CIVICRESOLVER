import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "../assets/css/reportIssue.css";
import { createComplaint } from "../api/complaintApi";
import { useNavigate } from "react-router-dom";
import L from "leaflet";

// Fix leaflet marker icons
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

function LocationPicker({ setLocation, setLocationName }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setLocation(e.latlng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        setLocationName(data.display_name || "Bhadravati, Chandrapur");
      } catch {
        setLocationName("Bhadravati, Chandrapur");
      }
    },
  });
  return null;
}

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Road");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locationName, setLocationName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "civicresolver"); // YOUR PRESET
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
      setError("Please fill all fields and select location");
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary();

      await createComplaint({
        title,
        category: category.toUpperCase(),
        description,
        location: locationName,
        imageUrl,
      });

      alert("Complaint submitted successfully ✅");
      navigate("/track-report");
    } catch {
      setError("Failed to submit complaint");
    }
  };

  return (
    <div className="report-page">
      <h1 className="report-title">Report a Civic Issue</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="report-form" onSubmit={handleSubmit}>
        <label>Issue Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Road</option>
          <option>Garbage</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Other</option>
        </select>

        <label>Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Select Location</label>
        {locationName && <p>📍 {locationName}</p>}

        <div className="map-box">
          <MapContainer center={DEFAULT_LOCATION} zoom={13} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} />
            <LocationPicker
              setLocation={setLocation}
              setLocationName={setLocationName}
            />
          </MapContainer>
        </div>

        <label>Upload Photo</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

        <button type="submit" className="submit-btn">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
