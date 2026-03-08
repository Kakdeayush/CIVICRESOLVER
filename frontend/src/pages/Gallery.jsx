import { useEffect, useState } from "react";
import "../assets/css/gallery.css";
import api from "../api/axios";

const Gallery = () => {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("All");
  const [area, setArea] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/api/complaints/public");
        setComplaints(res.data);
      } catch (err) {
        setError("Failed to load public complaints");
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((item) => {
    return (
      (category === "All" || item.category === category) &&
      (area === "All" || item.area === area)
    );
  });

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">Public Complaints Gallery</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Filters */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Other">Other</option>
        </select>

        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="All">All Areas</option>
          {[
            ...new Set(complaints.map((c) => c.area).filter(Boolean)),
          ].map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="gallery-grid">
        {filteredComplaints.length === 0 && (
          <p>No complaints available</p>
        )}

        {filteredComplaints.map((item) => (
          <div className="gallery-card" key={item.id}>
            <img
              src={item.imageUrl || "/img/city.jpeg"}
              alt={item.title}
            />

            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="card-meta">
                <span>{item.category}</span>
                <span>{item.area}</span>
              </div>

              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
