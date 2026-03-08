import "../assets/css/trackReport.css";
import { useEffect, useState } from "react";
import { getMyComplaints } from "../api/complaintApi"; // ✅ fixed import

const TrackReport = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      setError("");
      try {
        const res = await getMyComplaints(); // ✅ use correct API
        setComplaints(res.data);
      } catch (err) {
        setError("Failed to fetch complaints");
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="track-page">
      <h1 className="track-title">Track Your Complaints</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="complaint-list">
        {complaints.length === 0 && !error && (
          <p>No complaints found. Submit one from the Report Issue page.</p>
        )}

        {complaints.map((item) => (
          <div className="complaint-card" key={item.id}>
            <div className="card-header">
              <h2>{item.title}</h2>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>

            <p className="complaint-id">Complaint ID: {item.id}</p>

            <div className="card-body">
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackReport;
