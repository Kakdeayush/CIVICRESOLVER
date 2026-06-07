import { useEffect, useMemo, useState } from "react";
import "../assets/css/admin.css";
import { getAllSuggestions, updateSuggestionStatus } from "../api/suggestionApi";

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "IMPLEMENTED", label: "Implemented" },
];

const STATUS_FILTERS = [
  { value: "all", label: "All Status" },
  ...STATUS_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
  })),
];

const DAY_MS = 24 * 60 * 60 * 1000;

const normalizeStatus = (status) => String(status ?? "").trim().toUpperCase();
const normalizeText = (value) => String(value ?? "").trim().toLowerCase();

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getTimestamp = (suggestion) => parseDate(suggestion.updatedAt || suggestion.createdAt)?.getTime() || 0;

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

const statusLabel = (status) =>
  STATUS_OPTIONS.find((option) => option.value === normalizeStatus(status))?.label || "New";

const statusClass = (status) =>
  normalizeStatus(status).toLowerCase().replaceAll("_", "-");

const AdminSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    try {
      const res = await getAllSuggestions();
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      alert("Failed to load suggestions from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const updateSuggestionInState = (suggestionId, updater) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId ? updater(suggestion) : suggestion
      )
    );
  };

  const handleStatusChange = async (suggestionId, newStatus) => {
    try {
      await updateSuggestionStatus(suggestionId, newStatus);
      const normalizedStatus = normalizeStatus(newStatus);
      updateSuggestionInState(suggestionId, (suggestion) => ({
        ...suggestion,
        status: normalizedStatus,
        updatedAt: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Failed to update suggestion status:", err);
      alert("Failed to update suggestion status");
    }
  };

  const summary = useMemo(() => {
    const now = Date.now();
    const newCount = suggestions.filter((suggestion) => normalizeStatus(suggestion.status) === "NEW").length;
    const reviewCount = suggestions.filter(
      (suggestion) => normalizeStatus(suggestion.status) === "UNDER_REVIEW"
    ).length;
    const approvedCount = suggestions.filter(
      (suggestion) => normalizeStatus(suggestion.status) === "APPROVED"
    ).length;
    const implementedCount = suggestions.filter(
      (suggestion) => normalizeStatus(suggestion.status) === "IMPLEMENTED"
    ).length;
    const staleCount = suggestions.filter((suggestion) => {
      const createdAt = parseDate(suggestion.createdAt);
      const isClosed = ["REJECTED", "IMPLEMENTED"].includes(normalizeStatus(suggestion.status));
      return createdAt ? !isClosed && now - createdAt.getTime() > 7 * DAY_MS : false;
    }).length;

    return {
      total: suggestions.length,
      newCount,
      reviewCount,
      approvedCount,
      implementedCount,
      staleCount,
    };
  }, [suggestions]);

  const filteredSuggestions = useMemo(() => {
    const query = normalizeText(searchQuery);

    return [...suggestions]
      .filter((suggestion) => {
        if (statusFilter === "all") return true;
        return normalizeStatus(suggestion.status) === statusFilter;
      })
      .filter((suggestion) => {
        if (!query) return true;

        const searchable = [
          suggestion.id,
          suggestion.title,
          suggestion.description,
          suggestion.area,
          suggestion.category,
          suggestion.createdByName,
        ]
          .map(normalizeText)
          .join(" ");

        return searchable.includes(query);
      })
      .sort((left, right) => getTimestamp(right) - getTimestamp(left));
  }, [searchQuery, statusFilter, suggestions]);

  const summaryCards = [
    {
      label: "Total suggestions",
      value: summary.total,
      hint: "Stored in the datastore",
      tone: "blue",
    },
    {
      label: "New ideas",
      value: summary.newCount,
      hint: "Waiting for review",
      tone: "amber",
    },
    {
      label: "In review",
      value: summary.reviewCount,
      hint: "Actively being assessed",
      tone: "violet",
    },
    {
      label: "Approved",
      value: summary.approvedCount,
      hint: "Ready to move forward",
      tone: "green",
    },
    {
      label: "Implemented",
      value: summary.implementedCount,
      hint: "Already delivered",
      tone: "pink",
    },
    {
      label: "Stale backlog",
      value: summary.staleCount,
      hint: "Older than 7 days",
      tone: "cyan",
    },
  ];

  const clearFilters = () => {
    setStatusFilter("all");
    setSearchQuery("");
  };

  if (loading) return <p>Loading suggestions...</p>;

  return (
    <div className="admin-suggestions">
      <div className="suggestions-header">
        <div>
          <h1>Citizen Suggestions</h1>
          <p>Review ideas submitted by residents and take action</p>
          <span className="complaints-count">
            {filteredSuggestions.length} of {suggestions.length} suggestions shown
          </span>
        </div>

        <div className="suggestions-actions">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search title, area, category..."
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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

      <section className="complaints-summary suggestions-summary">
        {summaryCards.map((card) => (
          <article key={card.label} className={`summary-card tone-${card.tone} surface-card`}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.hint}</p>
          </article>
        ))}
      </section>

      {filteredSuggestions.length === 0 ? (
        <div className="complaints-empty surface-card">
          <h2>No suggestions found</h2>
          <p>Try a different search term or clear the status filter.</p>
          <button type="button" className="dashboard-button primary" onClick={clearFilters}>
            Show all suggestions
          </button>
        </div>
      ) : (
        <div className="suggestions-list">
          {filteredSuggestions.map((suggestion) => (
            <div className="suggestion-card-admin" key={suggestion.id}>
              <div className="suggestion-card-main">
                <div className="suggestion-card-header">
                  <div>
                    <h3>{suggestion.title}</h3>
                    <p className="suggestion-desc">{suggestion.description}</p>
                  </div>
                  <span className="suggestion-category-badge">
                    {suggestion.category?.replaceAll("_", " ") || "OTHER"}
                  </span>
                </div>

                <div className="admin-suggestion-meta">
                  <span>Area: {suggestion.area || "Unknown area"}</span>
                  {suggestion.latitude !== null &&
                    suggestion.latitude !== undefined &&
                    suggestion.longitude !== null &&
                    suggestion.longitude !== undefined && (
                      <span>
                        Geo: {Number(suggestion.latitude).toFixed(5)}, {Number(suggestion.longitude).toFixed(5)}
                      </span>
                    )}
                  <span>By: {suggestion.createdByName || "Unknown user"}</span>
                  <span>Date: {formatDateTime(suggestion.createdAt)}</span>
                  <span>Updated: {formatDateTime(suggestion.updatedAt || suggestion.createdAt)}</span>
                  <span>ID: {suggestion.id}</span>
                </div>
              </div>

              <div className="suggestion-card-actions">
                <span className={`suggestion-status ${statusClass(suggestion.status)}`}>
                  {statusLabel(suggestion.status)}
                </span>

                <select
                  value={normalizeStatus(suggestion.status)}
                  onChange={(event) => handleStatusChange(suggestion.id, event.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSuggestions;
