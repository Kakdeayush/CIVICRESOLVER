import { useEffect, useMemo, useState } from "react";
import "../assets/css/admin.css";
import { assignOfficer, getAllComplaints, updateComplaintStatus } from "../api/complaintApi";

const officers = [
  { id: "2", name: "Admin User" },
  { id: "3", name: "Ward Officer" },
  { id: "4", name: "Municipal Engineer" },
];

const STATUS_FILTERS = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "ongoing", label: "Ongoing" },
  { value: "resolved", label: "Resolved" },
];

const DAY_MS = 24 * 60 * 60 * 1000;

const normalizeStatus = (status) => String(status ?? "").trim().toUpperCase();
const normalizeText = (value) => String(value ?? "").trim().toLowerCase();

const parseDate = (value) => {       
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getTimestamp = (complaint) => parseDate(complaint.updatedAt || complaint.createdAt)?.getTime() || 0;

const formatDateTime = (value) => {
  const date = parseDate(value);
  if (!date) return "Unknown";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [sortBy, setSortBy] = useState("date"); // date, category, area, user
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data || []);
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

  useEffect(() => {
    if (!selectedComplaint) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedComplaint(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedComplaint]);

  const updateComplaintInState = (complaintId, updater) => {
    setComplaints((prev) =>
      prev.map((complaint) => (complaint.id === complaintId ? updater(complaint) : complaint))
    );
    setSelectedComplaint((prev) =>
      prev && prev.id === complaintId ? updater(prev) : prev
    );
  };

  const complaintStats = useMemo(() => {
    const now = Date.now();
    const openCount = complaints.filter((complaint) => {
      const status = normalizeStatus(complaint.status);
      return status === "PENDING" || status === "ONGOING";
    }).length;
    const resolvedCount = complaints.filter(
      (complaint) => normalizeStatus(complaint.status) === "RESOLVED"
    ).length;
    const assignedCount = complaints.filter((complaint) => Boolean(complaint.assignedOfficerId)).length;
    const staleCount = complaints.filter((complaint) => {
      const status = normalizeStatus(complaint.status);
      if (status === "RESOLVED") return false;
      const createdAt = parseDate(complaint.createdAt);
      return createdAt ? now - createdAt.getTime() > 7 * DAY_MS : false;
    }).length;

    return {
      total: complaints.length,
      open: openCount,
      resolved: resolvedCount,
      assigned: assignedCount,
      stale: staleCount,
    };
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    const query = normalizeText(searchQuery);

    let filtered = [...complaints]
      .filter((complaint) => {
        if (statusFilter === "all") return true;
        return normalizeStatus(complaint.status).toLowerCase() === statusFilter;
      })
      .filter((complaint) => {
        if (!query) return true;

        const searchable = [
          complaint.id,
          complaint.title,
          complaint.description,
          complaint.location,
          complaint.category,
          complaint.createdByName,
          complaint.assignedOfficerName,
        ]
          .map(normalizeText)
          .join(" ");

        return searchable.includes(query);
      });

    // Apply sorting
    filtered.sort((left, right) => {
      let compareValue = 0;

      if (sortBy === "date") {
        compareValue = getTimestamp(right) - getTimestamp(left);
      } else if (sortBy === "category") {
        const leftCategory = (left.category || "").toLowerCase();
        const rightCategory = (right.category || "").toLowerCase();
        compareValue = leftCategory.localeCompare(rightCategory);
      } else if (sortBy === "area") {
        const leftArea = (left.location || "").toLowerCase();
        const rightArea = (right.location || "").toLowerCase();
        compareValue = leftArea.localeCompare(rightArea);
      } else if (sortBy === "user") {
        const leftUser = (left.createdByName || "").toLowerCase();
        const rightUser = (right.createdByName || "").toLowerCase();
        compareValue = leftUser.localeCompare(rightUser);
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return filtered;
  }, [complaints, searchQuery, statusFilter, sortBy, sortOrder]);

  const summaryCards = [
    {
      label: "Total complaints",
      value: complaintStats.total,
      hint: "Stored in the datastore",
      tone: "blue",
    },
    {
      label: "Open cases",
      value: complaintStats.open,
      hint: "Pending or ongoing",
      tone: "amber",
    },
    {
      label: "Assigned",
      value: complaintStats.assigned,
      hint: "With an officer attached",
      tone: "violet",
    },
    {
      label: "Resolved",
      value: complaintStats.resolved,
      hint: "Closed successfully",
      tone: "green",
    },
    {
      label: "Stale backlog",
      value: complaintStats.stale,
      hint: "Older than 7 days",
      tone: "pink",
    },
  ];

  const handleStatusChange = async (complaintId, newStatus) => {
    if (!newStatus) return;

    try {
      await updateComplaintStatus(complaintId, newStatus.toUpperCase());
      const normalizedStatus = newStatus.toUpperCase();
      updateComplaintInState(complaintId, (complaint) => ({
        ...complaint,
        status: normalizedStatus,
        updatedAt: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  const handleAssignOfficer = async (complaintId, officerId) => {
    if (!officerId) return;

    try {
      await assignOfficer(complaintId, { officerId });
      const officer = officers.find((item) => item.id === officerId);
      updateComplaintInState(complaintId, (complaint) => ({
        ...complaint,
        assignedOfficerId: officerId,
        assignedOfficerName: officer?.name || complaint.assignedOfficerName || "Assigned officer",
        updatedAt: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Failed to assign officer:", err);
      alert("Failed to assign officer");
    }
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeDetails = () => {
    setSelectedComplaint(null);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("date");
    setSortOrder("desc");
  };

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="admin-complaints">
      <div className="complaints-header">
        <div>
          <h1>Citizen Complaints</h1>
          <p>Review, assign and manage all reported issues</p>
          <span className="complaints-count">
            {filteredComplaints.length} of {complaints.length} complaints shown
          </span>
        </div>

        <div className="complaints-actions">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search title, location, officer..."
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            title="Sort by"
          >
            <option value="date">Latest First</option>
            <option value="category">Category</option>
            <option value="area">Area (Location)</option>
            <option value="user">Reporter Name</option>
          </select>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            title="Sort order"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <button
            type="button"
            className="dashboard-button secondary complaints-reset"
            onClick={clearFilters}
          >
            Reset
          </button>
        </div>
      </div>

      <section className="complaints-summary">
        {summaryCards.map((card) => (
          <article key={card.label} className={`summary-card tone-${card.tone} surface-card`}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.hint}</p>
          </article>
        ))}
      </section>

      {filteredComplaints.length === 0 ? (
        <div className="complaints-empty surface-card">
          <h2>No complaints found</h2>
          <p>Try a different search term or clear the status filter.</p>
          <button type="button" className="dashboard-button primary" onClick={clearFilters}>
            Show all complaints
          </button>
        </div>
      ) : (
        <div className="complaints-list">
          {filteredComplaints.map((complaint) => {
            const status = normalizeStatus(complaint.status);
            const statusValue = status.toLowerCase() || "pending";

            return (
              <div className="complaint-card-admin" key={complaint.id}>
                <img src={complaint.imageUrl || "/img/placeholder.png"} alt="complaint" />

                <div className="complaint-info">
                  <div className="complaint-card-top">
                    <div>
                      <h2>{complaint.title}</h2>
                      <p className="desc">{complaint.description}</p>
                    </div>
                    <span className={`status ${statusValue}`}>{status || "PENDING"}</span>
                  </div>

                  <div className="meta">
                    <span>Location: {complaint.location || "Not provided"}</span>
                    <span>Reporter: {complaint.createdByName || "Unknown user"}</span>
                    <span>Category: {complaint.category || "Uncategorized"}</span>
                    <span>Last updated: {formatDateTime(complaint.updatedAt || complaint.createdAt)}</span>
                    <span>ID: {complaint.id}</span>
                    <span>
                      Assigned: {complaint.assignedOfficerName || "Unassigned"}
                    </span>
                  </div>

                  <div className="badges">
                    <span className="category">{complaint.category || "Uncategorized"}</span>
                    <span className="category soft">
                      {complaint.assignedOfficerName
                        ? `Officer: ${complaint.assignedOfficerName}`
                        : "Needs assignment"}
                    </span>
                  </div>
                </div>

                <div className="complaint-actions">
                  <select
                    value={complaint.assignedOfficerId || ""}
                    onChange={(event) => handleAssignOfficer(complaint.id, event.target.value)}
                  >
                    <option value="">Assign Officer</option>
                    {officers.map((officer) => (
                      <option key={officer.id} value={officer.id}>
                        {officer.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={statusValue}
                    onChange={(event) => handleStatusChange(complaint.id, event.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  <button className="view-btn" onClick={() => handleViewDetails(complaint)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedComplaint && (
        <div className="complaint-modal-backdrop" onClick={closeDetails}>
          <div className="complaint-modal" onClick={(event) => event.stopPropagation()}>
            <div className="complaint-modal-header">
              <h2>Complaint Details</h2>
              <button
                className="complaint-modal-close"
                onClick={closeDetails}
                aria-label="Close complaint details"
              >
                X
              </button>
            </div>

            <div className="complaint-modal-body">
              <div className="complaint-modal-image">
                <img
                  src={selectedComplaint.imageUrl || "/img/placeholder.png"}
                  alt="complaint"
                />
              </div>

              <div className="complaint-modal-info">
                <h3>{selectedComplaint.title}</h3>
                <p className="detail-desc">{selectedComplaint.description}</p>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Status</span>
                    <span
                      className={`status ${
                        normalizeStatus(selectedComplaint.status).toLowerCase() || "pending"
                      }`}
                    >
                      {normalizeStatus(selectedComplaint.status) || "UNKNOWN"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">
                      {selectedComplaint.category || "Not provided"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">
                      {selectedComplaint.location || "Not provided"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Reported By</span>
                    <span className="detail-value">
                      {selectedComplaint.createdByName || "Not provided"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Reported At</span>
                    <span className="detail-value">
                      {formatDateTime(selectedComplaint.createdAt)}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Last Updated</span>
                    <span className="detail-value">
                      {formatDateTime(selectedComplaint.updatedAt || selectedComplaint.createdAt)}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Complaint ID</span>
                    <span className="detail-value">{selectedComplaint.id}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Assigned Officer</span>
                    <span className="detail-value">
                      {selectedComplaint.assignedOfficerName || "Unassigned"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
