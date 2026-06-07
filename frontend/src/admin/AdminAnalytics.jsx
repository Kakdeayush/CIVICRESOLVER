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

const CHART_COLORS = ["#38bdf8", "#f472b6", "#22c55e", "#f59e0b", "#8b5cf6", "#f97316"];

const fetchAnalyticsData = async () => {
  const [complaintsRes, suggestionsRes] = await Promise.all([
    getAllComplaints(),
    getAllSuggestions(),
  ]);

  return {
    complaints: complaintsRes.data,
    suggestions: suggestionsRes.data,
  };
};

const loadAnalyticsData = async ({
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
    const data = await fetchAnalyticsData();
    setComplaints(data.complaints);
    setSuggestions(data.suggestions);
    setLastRefreshed(new Date());
  } catch {
    setError("Failed to load analytics data from the datastore");
  } finally {
    if (silent) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  }
};

const AdminAnalytics = () => {
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

      await loadAnalyticsData({
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
      loadAnalyticsData({
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
  const activeStatusSeries =
    view === "suggestions" ? insights.suggestionStatusSeries : insights.complaintStatusSeries;
  const activeCategories =
    view === "suggestions" ? insights.suggestionCategorySeries : insights.complaintCategorySeries;
  const activeStatusColors = view === "suggestions" ? CHART_COLORS.slice(0, 5) : CHART_COLORS;
  const activityItems = insights.recentActivity.filter(
    (item) => view === "overview" || item.kind === view
  );

  const metrics = [
    {
      label: "Resolution rate",
      value: formatPercent(insights.complaintMetrics.resolutionRate),
      hint: `${insights.complaintMetrics.resolved} resolved complaints`,
    },
    {
      label: "Average closure",
      value: formatDurationDays(insights.complaintMetrics.averageResolutionDays),
      hint: `${insights.complaintMetrics.staleBacklog} stale complaints`,
    },
    {
      label: "Suggestion adoption",
      value: formatPercent(insights.suggestionMetrics.adoptionRate),
      hint: `${insights.suggestionMetrics.adopted} adopted suggestions`,
    },
    {
      label: "Geo-tagged ideas",
      value: insights.suggestionMetrics.geoTagged,
      hint: `${formatPercent(insights.suggestionMetrics.geoTagRate)} with coordinates`,
    },
  ];

  const handleRefresh = async () => {
    await loadAnalyticsData({
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
      <div className="admin-analytics admin-state-card surface-card">
        <span className="section-eyebrow">Loading analytics</span>
        <h1>Reading datastore records for analysis...</h1>
        <p>The analytics view is gathering complaints and suggestions right now.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-analytics admin-state-card surface-card">
        <span className="section-eyebrow">Analytics error</span>
        <h1>We could not build the insights view</h1>
        <p>{error}</p>
        <button type="button" className="dashboard-button" onClick={handleRefresh}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-analytics">
      <section className="analytics-hero surface-card">
        <div className="analytics-hero-copy">
          <span className="section-eyebrow">Data explorer</span>
          <h1>Analytics &amp; insights</h1>
          <p>
            The charts below are built from the live datastore, so switching
            the time window or view immediately changes the analysis.
          </p>

          <div className="admin-hero-actions">
            <button type="button" className="dashboard-button primary" onClick={handleRefresh}>
              {refreshing ? "Refreshing..." : "Refresh data"}
            </button>
            <button type="button" className="dashboard-button" onClick={() => setView("complaints")}>
              Complaints view
            </button>
            <button type="button" className="dashboard-button" onClick={() => setView("suggestions")}>
              Suggestions view
            </button>
          </div>

          <div className="admin-hero-chips">
            <span>{activeView.label}</span>
            <span>{activeRange.label} window</span>
            <span>{insights.totalRecords} records in scope</span>
            <span>{formatRelativeTime(lastRefreshed)}</span>
          </div>
        </div>

        <div className="analytics-hero-side">
          {metrics.map((metric) => (
            <div key={metric.label} className="hero-metric-card">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.hint}</p>
            </div>
          ))}
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

      <section className="analytics-grid-modern">
        <article className="insight-card wide surface-card">
          <div className="insight-header">
            <div>
              <span className="insight-kicker">Trend analysis</span>
              <h2>
                {view === "suggestions"
                  ? "Suggestion growth by month"
                  : view === "complaints"
                  ? "Complaint growth by month"
                  : "Monthly complaint and suggestion growth"}
              </h2>
            </div>
          </div>

          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={insights.monthlySeries}>
                <defs>
                  <linearGradient id="analyticsComplaintFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.42} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="analyticsSuggestionFill" x1="0" y1="0" x2="0" y2="1">
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
                    fill="url(#analyticsComplaintFill)"
                    strokeWidth={3}
                    name="Complaints"
                  />
                )}
                {(view !== "complaints") && (
                  <Area
                    type="monotone"
                    dataKey="suggestions"
                    stroke="#f472b6"
                    fill="url(#analyticsSuggestionFill)"
                    strokeWidth={3}
                    name="Suggestions"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="insight-card surface-card">
          <div className="insight-header">
            <div>
              <span className="insight-kicker">Status distribution</span>
              <h2>{view === "suggestions" ? "Suggestion pipeline" : "Complaint workflow"}</h2>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={activeStatusSeries}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
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

          <div className="legend-grid">
            {activeStatusSeries.map((entry, index) => (
              <span key={entry.name} className="legend-pill">
                <i style={{ background: activeStatusColors[index % activeStatusColors.length] }} />
                {entry.name}
                <strong>{entry.value}</strong>
              </span>
            ))}
          </div>
        </article>

        <article className="insight-card surface-card">
          <div className="insight-header">
            <div>
              <span className="insight-kicker">Category distribution</span>
              <h2>{view === "suggestions" ? "Suggestion themes" : "Complaint categories"}</h2>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activeCategories} layout="vertical" margin={{ left: 6 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.18} />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 12, 12, 0]}>
                {activeCategories.map((entry, index) => (
                  <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="insight-card wide surface-card">
          <div className="insight-header">
            <div>
              <span className="insight-kicker">Recent records</span>
              <h2>
                {view === "suggestions"
                  ? "Latest suggestions in the selected range"
                  : view === "complaints"
                  ? "Latest complaints in the selected range"
                  : "Latest records in the selected range"}
              </h2>
            </div>
          </div>

          <div className="analytics-table">
            <div className="analytics-table-head">
              <span>Type</span>
              <span>Title</span>
              <span>Status</span>
              <span>Updated</span>
            </div>

            {activityItems.length === 0 ? (
              <p className="empty-state compact">No records found in this range.</p>
            ) : (
              activityItems.map((item) => (
              <button
                  type="button"
                  key={item.id}
                  className="analytics-table-row"
                  onClick={() => navigate(item.route)}
                >
                  <span className={`table-type ${item.kind}`}>{item.badge}</span>
                  <span className="table-title">{item.title}</span>
                  <span className={`status-chip ${item.status.toLowerCase()}`}>{item.statusLabel}</span>
                  <span className="table-time">{item.timestamp}</span>
                </button>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default AdminAnalytics;
