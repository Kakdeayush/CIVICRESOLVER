import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAllComplaints } from "../api/complaintApi";
import { getAllSuggestions } from "../api/suggestionApi";
import "../assets/css/admin.css";
import {
  RANGE_PRESETS,
  VIEW_PRESETS,
  createAdminInsights,
  formatDurationDays,
  formatPercent,
  formatRelativeTime,
} from "./adminInsights";

const COMPLAINT_COLORS = ["#38bdf8", "#f59e0b", "#22c55e"];
const SUGGESTION_COLORS = ["#8b5cf6", "#0ea5e9", "#22c55e", "#ef4444", "#f97316"];
const CATEGORY_COLORS = ["#2563eb", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#f97316"];

const fetchDashboardData = async () => {
  const [complaintsRes, suggestionsRes] = await Promise.all([
    getAllComplaints(),
    getAllSuggestions(),
  ]);

  
  return {
    complaints: complaintsRes.data,
    suggestions: suggestionsRes.data,
  };
};

const loadDashboardData = async ({
  silent = false,
  setLoading,
  setRefreshing,
  setError,
  setComplaints,
  setSuggestions,
  setLastRefreshed,
}) => {
  if (silent) {
    setRefreshing(true);
  } else {
    setLoading(true);
  }

  setError("");

  try {
    const data = await fetchDashboardData();
    setComplaints(data.complaints);
    setSuggestions(data.suggestions);
    setLastRefreshed(new Date());
  } catch {
    setError("Failed to load live admin data from the datastore");
  } finally {
    if (silent) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  }
};

const AdminHome = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState("overview");
  const [rangeMode, setRangeMode] = useState("6m");
  const [lastRefreshed, setLastRefreshed] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      if (cancelled) {
        return;
      }

      await loadDashboardData({
        silent: false,
        setLoading,
        setRefreshing,
        setError,
        setComplaints,
        setSuggestions,
        setLastRefreshed,
      });
    };

    initialize();

    const intervalId = setInterval(() => {
      loadDashboardData({
        silent: true,
        setLoading,
        setRefreshing,
        setError,
        setComplaints,
        setSuggestions,
        setLastRefreshed,
      });
    }, 60000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  const insights = createAdminInsights({
    complaints,
    suggestions,
    rangeMode,
  });

  const activeView = VIEW_PRESETS.find((option) => option.value === view) || VIEW_PRESETS[0];
  const activeRange = RANGE_PRESETS.find((option) => option.value === rangeMode) || RANGE_PRESETS[2];
  const isOverview = view === "overview";
  const activeStatusSeries =
    view === "suggestions" ? insights.suggestionStatusSeries : insights.complaintStatusSeries;
  const activeCategories =
    view === "suggestions" ? insights.suggestionCategorySeries : insights.complaintCategorySeries;
  const activeActivity = insights.recentActivity.filter(
    (item) => isOverview || item.kind === view
  );
  const activeStatusColors =
    view === "suggestions" ? SUGGESTION_COLORS : COMPLAINT_COLORS;
  const activityTitle =
    view === "suggestions"
      ? "Latest suggestions"
      : view === "complaints"
      ? "Latest complaints"
      : "Latest activity";

  const summaryCards =
    view === "suggestions"
      ? [
          {
            label: "All suggestions",
            value: insights.suggestionMetrics.total,
            hint: `${insights.suggestionMetrics.pipeline} in the review pipeline`,
            tone: "violet",
          },
          {
            label: "New",
            value: insights.suggestionMetrics.new,
            hint: "Fresh ideas waiting for review",
            tone: "blue",
          },
          {
            label: "Under review",
            value: insights.suggestionMetrics.underReview,
            hint: "Active civic discussion",
            tone: "amber",
          },
          {
            label: "Approved",
            value: insights.suggestionMetrics.approved,
            hint: "Ready for execution",
            tone: "green",
          },
          {
            label: "Implemented",
            value: insights.suggestionMetrics.implemented,
            hint: "Ideas turned into change",
            tone: "pink",
          },
          {
            label: "Adoption rate",
            value: formatPercent(insights.suggestionMetrics.adoptionRate),
            hint: `${insights.suggestionMetrics.geoTagged} geo-tagged ideas`,
            tone: "cyan",
          },
        ]
      : view === "complaints"
      ? [
          {
            label: "All complaints",
            value: insights.complaintMetrics.total,
            hint: `${insights.complaintMetrics.open} currently open`,
            tone: "blue",
          },
          {
            label: "Pending",
            value: insights.complaintMetrics.pending,
            hint: "Needs initial action",
            tone: "amber",
          },
          {
            label: "Ongoing",
            value: insights.complaintMetrics.ongoing,
            hint: "Work in progress",
            tone: "violet",
          },
          {
            label: "Resolved",
            value: insights.complaintMetrics.resolved,
            hint: `${formatPercent(insights.complaintMetrics.resolutionRate)} resolution rate`,
            tone: "green",
          },
          {
            label: "Assigned",
            value: insights.complaintMetrics.assigned,
            hint: `${formatPercent(insights.complaintMetrics.assignmentRate)} coverage`,
            tone: "pink",
          },
          {
            label: "Avg resolution",
            value: formatDurationDays(insights.complaintMetrics.averageResolutionDays),
            hint: `${insights.complaintMetrics.staleBacklog} stale items over 7 days`,
            tone: "cyan",
          },
        ]
      : [
          {
            label: "Total records",
            value: insights.totalRecords,
            hint: `${insights.complaintMetrics.total} complaints and ${insights.suggestionMetrics.total} suggestions`,
            tone: "blue",
          },
          {
            label: "Open complaints",
            value: insights.complaintMetrics.open,
            hint: `${insights.complaintMetrics.resolved} already resolved`,
            tone: "amber",
          },
          {
            label: "Suggestions in pipeline",
            value: insights.suggestionMetrics.pipeline,
            hint: "Awaiting review or approval",
            tone: "violet",
          },
          {
            label: "Resolved rate",
            value: formatPercent(insights.complaintMetrics.resolutionRate),
            hint: `${formatDurationDays(insights.complaintMetrics.averageResolutionDays)} average closure`,
            tone: "green",
          },
          {
            label: "Assignment coverage",
            value: formatPercent(insights.complaintMetrics.assignmentRate),
            hint: `${insights.complaintMetrics.assigned} assigned cases`,
            tone: "pink",
          },
          {
            label: "Geo-tagged ideas",
            value: insights.suggestionMetrics.geoTagged,
            hint: `${formatPercent(insights.suggestionMetrics.geoTagRate)} of suggestions`,
            tone: "cyan",
          },
        ];

  const handleRefresh = async () => {
    await loadDashboardData({
      silent: true,
      setLoading,
      setRefreshing,
      setError,
      setComplaints,
      setSuggestions,
      setLastRefreshed,
    });
  };

  if (loading) {
    return (
      <div className="admin-dashboard admin-state-card surface-card">
        <span className="section-eyebrow">Loading live data</span>
        <h1>Building your dashboard from datastore records...</h1>
        <p>The admin console is reading complaints and suggestions right now.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard admin-state-card surface-card">
        <span className="section-eyebrow">Dashboard error</span>
        <h1>We could not load the admin data</h1>
        <p>{error}</p>
        <button type="button" className="dashboard-button" onClick={handleRefresh}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <section className="admin-hero surface-card">
        <div className="admin-hero-copy">
          <span className="section-eyebrow">Live datastore insights</span>
          <h1>Admin dashboard</h1>
          <p>
            Every metric here is computed from the stored complaints and suggestions,
            so the view reflects what is actually happening in the city.
          </p>

          <div className="admin-hero-actions">
            <button type="button" className="dashboard-button primary" onClick={handleRefresh}>
              {refreshing ? "Refreshing..." : "Refresh data"}
            </button>
            <button
              type="button"
              className="dashboard-button"
              onClick={() => navigate("/admin/analytics")}
            >
              Open analytics
            </button>
            <button
              type="button"
              className="dashboard-button"
              onClick={() => navigate("/admin/complaints")}
            >
              Manage complaints
            </button>
          </div>

          <div className="admin-hero-chips">
            <span>{activeView.label}</span>
            <span>{activeRange.label} window</span>
            <span>{insights.totalRecords} records in scope</span>
            <span>{formatRelativeTime(lastRefreshed)}</span>
          </div>
        </div>

        <div className="admin-hero-pulse">
          <div className="hero-pulse-card">
            <span className="pulse-label">Resolution rate</span>
            <strong>{formatPercent(insights.complaintMetrics.resolutionRate)}</strong>
            <p>{insights.complaintMetrics.resolved} resolved complaints</p>
          </div>
          <div className="hero-pulse-card">
            <span className="pulse-label">Suggestion adoption</span>
            <strong>{formatPercent(insights.suggestionMetrics.adoptionRate)}</strong>
            <p>{insights.suggestionMetrics.adopted} adopted ideas</p>
          </div>
          <div className="hero-pulse-card">
            <span className="pulse-label">Average closure</span>
            <strong>{formatDurationDays(insights.complaintMetrics.averageResolutionDays)}</strong>
            <p>{insights.complaintMetrics.staleBacklog} backlog items older than 7 days</p>
          </div>
        </div>
      </section>

      <section className="admin-toolbar surface-card">
        <div className="toolbar-group">
          {VIEW_PRESETS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`toolbar-chip ${view === option.value ? "active" : ""}`}
              onClick={() => setView(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="toolbar-group">
          {RANGE_PRESETS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`toolbar-chip ${rangeMode === option.value ? "active" : ""}`}
              onClick={() => setRangeMode(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="summary-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className={`summary-card tone-${card.tone} surface-card`}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.hint}</p>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-column">
          <article className="insight-card trend-card surface-card">
            <div className="insight-header">
              <div>
                <span className="insight-kicker">Trend line</span>
                <h2>
                  {isOverview
                    ? "Complaint and suggestion activity"
                    : view === "suggestions"
                    ? "Suggestion activity"
                    : "Complaint activity"}
                </h2>
              </div>
              <p>{rangeMode === "all" ? "All stored months" : `${activeRange.label} window`}</p>
            </div>

            <div className="chart-wrap tall">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={insights.monthlySeries}>
                  <defs>
                    <linearGradient id="complaintFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.42} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.04} />
                    </linearGradient>
                    <linearGradient id="suggestionFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f472b6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f472b6" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  {(view !== "suggestions") && (
                    <Area
                      type="monotone"
                      dataKey="complaints"
                      stroke="#38bdf8"
                      fill="url(#complaintFill)"
                      strokeWidth={3}
                      name="Complaints"
                    />
                  )}
                  {(view !== "complaints") && (
                    <Area
                      type="monotone"
                      dataKey="suggestions"
                      stroke="#f472b6"
                      fill="url(#suggestionFill)"
                      strokeWidth={3}
                      name="Suggestions"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <div className="mini-chart-grid">
            <article className="insight-card surface-card">
              <div className="insight-header">
                <div>
                  <span className="insight-kicker">Status mix</span>
                  <h2>
                    {view === "suggestions"
                      ? "Suggestion statuses"
                      : "Complaint statuses"}
                  </h2>
                </div>
              </div>

              {activeStatusSeries.length === 0 ? (
                <p className="empty-state compact">No status data in the selected range.</p>
              ) : (
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={activeStatusSeries}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={72}
                        outerRadius={104}
                        paddingAngle={4}
                      >
                        {activeStatusColors.map((color, index) => (
                          <Cell key={index} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="legend-grid">
                {activeStatusSeries.map((entry, index) => (
                  <span key={entry.name} className="legend-pill">
                    <i
                      style={{
                        background: activeStatusColors[index % activeStatusColors.length],
                      }}
                    />
                    {entry.name}
                    <strong>{entry.value}</strong>
                  </span>
                ))}
              </div>
            </article>

            <article className="insight-card surface-card">
              <div className="insight-header">
                <div>
                  <span className="insight-kicker">Category mix</span>
                  <h2>
                    {view === "suggestions"
                      ? "Suggestion themes"
                      : "Complaint categories"}
                  </h2>
                </div>
              </div>

              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={activeCategories} layout="vertical" margin={{ left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                      {activeCategories.map((entry, index) => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>
        </div>

        <div className="dashboard-column">
          <article className="insight-card surface-card">
            <div className="insight-header">
              <div>
                <span className="insight-kicker">{activityTitle}</span>
                <h2>Recent updates</h2>
              </div>
              <button
                type="button"
                className="link-button"
                onClick={() =>
                  navigate(view === "suggestions" ? "/admin/suggestions" : "/admin/complaints")
                }
              >
                Open list
              </button>
            </div>

            <div className="activity-list-modern">
              {activeActivity.length === 0 ? (
                <p className="empty-state">No records found in the selected range.</p>
              ) : (
                activeActivity.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="activity-item-modern"
                    onClick={() => navigate(item.route)}
                  >
                    <div className="activity-item-main">
                      <span className={`activity-badge ${item.kind}`}>{item.badge}</span>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                      <small>{item.meta}</small>
                    </div>
                    <div className="activity-item-side">
                      <span className={`status-chip ${item.status.toLowerCase()}`}>
                        {item.statusLabel}
                      </span>
                      <span className="activity-time">{item.timestamp}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </article>

          <article className="insight-card surface-card">
            <div className="insight-header">
              <div>
                <span className="insight-kicker">Hotspots</span>
                <h2>
                  {view === "suggestions"
                    ? "Top suggestion areas"
                    : view === "complaints"
                    ? "Top complaint locations"
                    : "Citizen activity hotspots"}
                </h2>
              </div>
            </div>

            {view === "suggestions" ? (
              <div className="hotspot-list">
                {insights.topSuggestionAreas.length === 0 ? (
                  <p className="empty-state">No area data in the selected range.</p>
                ) : (
                  insights.topSuggestionAreas.map((entry, index) => {
                    const maxValue = insights.topSuggestionAreas[0]?.value || 1;
                    return (
                      <div key={entry.name} className="hotspot-row">
                        <div className="hotspot-row-head">
                          <span>{entry.name}</span>
                          <strong>{entry.value}</strong>
                        </div>
                        <div className="hotspot-bar">
                          <span
                            style={{ width: `${(entry.value / maxValue) * 100}%` }}
                            className={`hotspot-fill tone-${index % CATEGORY_COLORS.length}`}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="hotspot-list">
                {insights.topComplaintLocations.length === 0 ? (
                  <p className="empty-state">No location data in the selected range.</p>
                ) : (
                  insights.topComplaintLocations.map((entry, index) => {
                    const maxValue = insights.topComplaintLocations[0]?.value || 1;
                    return (
                      <div key={entry.name} className="hotspot-row">
                        <div className="hotspot-row-head">
                          <span>{entry.name}</span>
                          <strong>{entry.value}</strong>
                        </div>
                        <div className="hotspot-bar">
                          <span
                            style={{ width: `${(entry.value / maxValue) * 100}%` }}
                            className={`hotspot-fill tone-${index % CATEGORY_COLORS.length}`}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {view === "overview" && (
              <div className="hotspot-split">
                <div>
                  <p className="hotspot-label">Complaints</p>
                  {insights.topComplaintLocations.length === 0 ? (
                    <p className="empty-state compact">No complaint locations yet.</p>
                  ) : (
                    insights.topComplaintLocations.map((entry) => (
                      <div key={entry.name} className="mini-hotspot">
                        <span>{entry.name}</span>
                        <strong>{entry.value}</strong>
                      </div>
                    ))
                  )}
                </div>
                <div>
                  <p className="hotspot-label">Suggestions</p>
                  {insights.topSuggestionAreas.length === 0 ? (
                    <p className="empty-state compact">No suggestion areas yet.</p>
                  ) : (
                    insights.topSuggestionAreas.map((entry) => (
                      <div key={entry.name} className="mini-hotspot">
                        <span>{entry.name}</span>
                        <strong>{entry.value}</strong>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </article>

          <article className="insight-card surface-card">
            <div className="insight-header">
              <div>
                <span className="insight-kicker">Quick actions</span>
                <h2>Shortcuts</h2>
              </div>
            </div>

            <div className="quick-action-grid">
              <button type="button" className="quick-action-btn" onClick={() => navigate("/admin/complaints")}>
                Manage complaints
              </button>
              <button type="button" className="quick-action-btn" onClick={() => navigate("/admin/suggestions")}>
                Review suggestions
              </button>
              <button type="button" className="quick-action-btn" onClick={() => navigate("/admin/analytics")}>
                Open analytics
              </button>
              <button type="button" className="quick-action-btn secondary" onClick={() => navigate("/admin/settings")}>
                System settings
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
