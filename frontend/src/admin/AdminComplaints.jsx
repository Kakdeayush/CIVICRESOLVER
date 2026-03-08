import { useState, useEffect } from "react";
import "../assets/css/admin.css";
import { getAllComplaints, updateComplaintStatus, assignOfficer } from "../api/complaintApi";

// Mock officer list (replace with real API later)
const officers = [
  { id: 1, name: "Ward Officer" },
  { id: 2, name: "Municipal Engineer" },
  { id: 3, name: "Field Staff" },
];

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
      alert("Failed to load complaints from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints by status
  const filteredComplaints =
    statusFilter === "all"
      ? complaints
      : complaints.filter((c) => c.status.toLowerCase() === statusFilter);

  // Handle status change
  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await updateComplaintStatus(complaintId, newStatus.toUpperCase());
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === complaintId ? { ...c, status: newStatus.toLowerCase() } : c
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  // Handle officer assignment
  const handleAssignOfficer = async (complaintId, officerId) => {
    if (!officerId) return;
    try {
      await assignOfficer(complaintId, { officerId });
      const officerName = officers.find((o) => o.id === parseInt(officerId))?.name;
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === complaintId ? { ...c, assignedOfficer: officerName } : c
        )
      );
    } catch (err) {
      console.error("Failed to assign officer:", err);
      alert("Failed to assign officer");
    }
  };

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="admin-complaints">
      {/* HEADER */}
      <div className="complaints-header">
        <div>
          <h1>Citizen Complaints</h1>
          <p>Review, assign and manage all reported issues</p>
        </div>

        <div className="complaints-actions">
          <input type="text" placeholder="Search complaints..." />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* COMPLAINT LIST */}
      <div className="complaints-list">
        {filteredComplaints.map((c) => (
          <div className="complaint-card-admin" key={c.id}>
            {/* LEFT */}
            <img src={c.imageUrl || "/img/placeholder.png"} alt="complaint" />

            {/* CENTER */}
            <div className="complaint-info">
              <h2>{c.title}</h2>
              <p className="desc">{c.description}</p>

              <div className="meta">
                <span>📍 {c.location}</span>
                <span>👤 {c.createdByName}</span>
                <span>📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                <span>🆔 {c.id}</span>
                {c.assignedOfficer && <span>👮 {c.assignedOfficer}</span>}
              </div>

              <div className="badges">
                <span className={`status ${c.status}`}>
                  {c.status.toUpperCase()}
                </span>
                <span className="category">{c.category}</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="complaint-actions">
              <select
                defaultValue=""
                onChange={(e) => handleAssignOfficer(c.id, e.target.value)}
              >
                <option value="">Assign Officer</option>
                {officers.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>

              <select
                value={c.status.toLowerCase()}
                onChange={(e) => handleStatusChange(c.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="resolved">Resolved</option>
              </select>

              <button className="view-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminComplaints;
