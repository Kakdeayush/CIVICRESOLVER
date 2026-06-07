const DAY_MS = 24 * 60 * 60 * 1000;

export const RANGE_PRESETS = [
  { label: "30D", value: "30d", days: 30 },
  { label: "90D", value: "90d", days: 90 },
  { label: "6M", value: "6m", days: 180 },
  { label: "All", value: "all", days: null },
];

export const VIEW_PRESETS = [
  { label: "Overview", value: "overview" },
  { label: "Complaints", value: "complaints" },
  { label: "Suggestions", value: "suggestions" },
];

export const COMPLAINT_STATUS_ORDER = ["PENDING", "ONGOING", "RESOLVED"];
export const SUGGESTION_STATUS_ORDER = [
  "NEW",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "IMPLEMENTED",
];

export const COMPLAINT_STATUS_LABELS = {
  PENDING: "Pending",
  ONGOING: "Ongoing",
  RESOLVED: "Resolved",
};

export const SUGGESTION_STATUS_LABELS = {
  NEW: "New",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  IMPLEMENTED: "Implemented",
};

export const COMPLAINT_CATEGORY_LABELS = {
  ROAD: "Road",
  WATER: "Water",
  ELECTRICITY: "Electricity",
  GARBAGE: "Garbage",
  STREET_LIGHT: "Street Light",
  OTHER: "Other",
};

export const SUGGESTION_CATEGORY_LABELS = {
  TRANSPORT: "Transport",
  CLEANLINESS: "Cleanliness",
  WATER_MANAGEMENT: "Water Management",
  STREET_LIGHTING: "Street Lighting",
  PARKS_AND_GREENERY: "Parks & Greenery",
  PUBLIC_SAFETY: "Public Safety",
  OTHER: "Other",
};

const normalizeKey = (value) => String(value ?? "").trim().toUpperCase();

const titleCase = (value) =>
  String(value ?? "")
    .trim()
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Unknown";

export const toDate = (value) => {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatRelativeTime = (value, now = new Date()) => {
  const date = toDate(value);
  if (!date) return "Unknown";

  const diffMinutes = Math.max(
    0,
    Math.round((now.getTime() - date.getTime()) / 60000)
  );

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;

  const diffYears = Math.round(diffMonths / 12);
  return `${diffYears}y ago`;
};

export const formatDurationDays = (days) => {
  if (!Number.isFinite(days) || days < 0) return "N/A";
  if (days < 1) return `${Math.max(1, Math.round(days * 24))}h`;
  if (days < 10) return `${days.toFixed(1)}d`;
  return `${Math.round(days)}d`;
};

export const formatPercent = (value) => `${Math.round(value || 0)}%`;

export const filterByRange = (records = [], rangeMode = "all", dateKey = "createdAt") => {
  const preset = RANGE_PRESETS.find((option) => option.value === rangeMode);
  if (!preset?.days) return [...records];

  const cutoff = Date.now() - preset.days * DAY_MS;
  return records.filter((record) => {
    const date = toDate(record?.[dateKey]);
    return date && date.getTime() >= cutoff;
  });
};

const countBy = (records = [], getter) => {
  const counts = new Map();

  for (const record of records) {
    const key = getter(record);
    if (!key) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => right.value - left.value || left.name.localeCompare(right.name));
};

const getMonthBuckets = (records = [], rangeMode = "all") => {
  const dates = records
    .map((record) => toDate(record.createdAt))
    .filter(Boolean);

  const anchor = dates.length
    ? new Date(Math.max(...dates.map((date) => date.getTime())))
    : new Date();

  let start;
  const preset = RANGE_PRESETS.find((option) => option.value === rangeMode);

  if (!preset?.days) {
    const earliest = dates.length
      ? new Date(Math.min(...dates.map((date) => date.getTime())))
      : new Date(anchor);
    start = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  } else {
    const months = Math.max(2, Math.ceil(preset.days / 30));
    start = new Date(anchor.getFullYear(), anchor.getMonth() - (months - 1), 1);
  }

  const end = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const buckets = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    buckets.push({
      key: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`,
      month: cursor.toLocaleString("en-US", { month: "short" }),
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return buckets;
};

const buildMonthlySeries = (complaints = [], suggestions = [], rangeMode = "all") => {
  const filteredComplaints = filterByRange(complaints, rangeMode);
  const filteredSuggestions = filterByRange(suggestions, rangeMode);
  const buckets = getMonthBuckets([...filteredComplaints, ...filteredSuggestions], rangeMode);

  const bucketMap = new Map(
    buckets.map((bucket) => [
      bucket.key,
      { month: bucket.month, complaints: 0, suggestions: 0, total: 0 },
    ])
  );

  const addRecord = (record, field) => {
    const date = toDate(record.createdAt);
    if (!date) return;

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const bucket = bucketMap.get(key);
    if (!bucket) return;

    bucket[field] += 1;
    bucket.total += 1;
  };

  filteredComplaints.forEach((record) => addRecord(record, "complaints"));
  filteredSuggestions.forEach((record) => addRecord(record, "suggestions"));

  return [...bucketMap.values()];
};

const buildSeries = (records = [], order = [], labelMap = {}) =>
  order.map((status) => ({
    name: labelMap[status] || titleCase(status),
    value: records.filter((record) => normalizeKey(record.status) === status).length,
  }));

const buildCategorySeries = (records = [], labelMap = {}, limit = 6) =>
  countBy(records, (record) => labelMap[normalizeKey(record.category)] || titleCase(record.category)).slice(0, limit);

const buildLocationSeries = (records = [], fieldName = "location", limit = 5) =>
  countBy(records, (record) => record?.[fieldName]?.trim() || "Unknown").slice(0, limit);

const getAverageResolutionDays = (complaints = []) => {
  const resolved = complaints.filter(
    (record) => normalizeKey(record.status) === "RESOLVED"
  );

  const durations = resolved
    .map((record) => {
      const createdAt = toDate(record.createdAt);
      const updatedAt = toDate(record.updatedAt || record.createdAt);
      if (!createdAt || !updatedAt) return null;
      return Math.max(0, updatedAt.getTime() - createdAt.getTime());
    })
    .filter((value) => value !== null);

  if (durations.length === 0) return 0;
  return durations.reduce((sum, value) => sum + value, 0) / durations.length / DAY_MS;
};

const buildComplaintMetrics = (complaints = []) => {
  const pending = complaints.filter((record) => normalizeKey(record.status) === "PENDING").length;
  const ongoing = complaints.filter((record) => normalizeKey(record.status) === "ONGOING").length;
  const resolved = complaints.filter((record) => normalizeKey(record.status) === "RESOLVED").length;
  const assigned = complaints.filter((record) => Boolean(record.assignedOfficerId)).length;
  const unassigned = complaints.length - assigned;
  const staleBacklog = complaints.filter((record) => {
    const status = normalizeKey(record.status);
    if (status === "RESOLVED") return false;
    const createdAt = toDate(record.createdAt);
    if (!createdAt) return false;
    return Date.now() - createdAt.getTime() > 7 * DAY_MS;
  }).length;

  return {
    total: complaints.length,
    pending,
    ongoing,
    resolved,
    open: pending + ongoing,
    assigned,
    unassigned,
    staleBacklog,
    assignmentRate: complaints.length ? (assigned / complaints.length) * 100 : 0,
    resolutionRate: complaints.length ? (resolved / complaints.length) * 100 : 0,
    averageResolutionDays: getAverageResolutionDays(complaints),
    freshCases: complaints.filter((record) => {
      const createdAt = toDate(record.createdAt);
      return createdAt ? Date.now() - createdAt.getTime() <= 7 * DAY_MS : false;
    }).length,
  };
};

const buildSuggestionMetrics = (suggestions = []) => {
  const newCount = suggestions.filter((record) => normalizeKey(record.status) === "NEW").length;
  const underReview = suggestions.filter((record) => normalizeKey(record.status) === "UNDER_REVIEW").length;
  const approved = suggestions.filter((record) => normalizeKey(record.status) === "APPROVED").length;
  const rejected = suggestions.filter((record) => normalizeKey(record.status) === "REJECTED").length;
  const implemented = suggestions.filter((record) => normalizeKey(record.status) === "IMPLEMENTED").length;
  const geoTagged = suggestions.filter(
    (record) =>
      record.latitude !== null &&
      record.latitude !== undefined &&
      record.longitude !== null &&
      record.longitude !== undefined
  ).length;

  return {
    total: suggestions.length,
    new: newCount,
    underReview,
    approved,
    rejected,
    implemented,
    pipeline: newCount + underReview,
    adopted: approved + implemented,
    adoptionRate: suggestions.length ? ((approved + implemented) / suggestions.length) * 100 : 0,
    geoTagged,
    geoTagRate: suggestions.length ? (geoTagged / suggestions.length) * 100 : 0,
  };
};

const buildRecentActivity = (complaints = [], suggestions = [], rangeMode = "all") => {
  const filteredComplaints = filterByRange(complaints, rangeMode);
  const filteredSuggestions = filterByRange(suggestions, rangeMode);

  const complaintItems = filteredComplaints.map((record) => {
    const eventDate = toDate(record.updatedAt || record.createdAt);
    return {
      id: `complaint-${record.id}`,
      kind: "complaint",
      title: record.title,
      status: normalizeKey(record.status),
      statusLabel: COMPLAINT_STATUS_LABELS[normalizeKey(record.status)] || titleCase(record.status),
      detail: record.location || "Location not provided",
      meta: record.assignedOfficerName
        ? `Assigned to ${record.assignedOfficerName}`
        : "Awaiting assignment",
      route: "/admin/complaints",
      badge: "Complaint",
      date: eventDate,
      timestamp: formatRelativeTime(eventDate),
    };
  });

  const suggestionItems = filteredSuggestions.map((record) => {
    const eventDate = toDate(record.updatedAt || record.createdAt);
    return {
      id: `suggestion-${record.id}`,
      kind: "suggestion",
      title: record.title,
      status: normalizeKey(record.status),
      statusLabel: SUGGESTION_STATUS_LABELS[normalizeKey(record.status)] || titleCase(record.status),
      detail: record.area || "Area not provided",
      meta:
        record.latitude !== null &&
        record.latitude !== undefined &&
        record.longitude !== null &&
        record.longitude !== undefined
          ? "Geo-tagged idea"
          : "No coordinates",
      route: "/admin/suggestions",
      badge: "Suggestion",
      date: eventDate,
      timestamp: formatRelativeTime(eventDate),
    };
  });

  return [...complaintItems, ...suggestionItems]
    .filter((item) => item.date)
    .sort((left, right) => right.date.getTime() - left.date.getTime())
    .slice(0, 6);
};

export const createAdminInsights = ({
  complaints = [],
  suggestions = [],
  rangeMode = "6m",
}) => {
  const filteredComplaints = filterByRange(complaints, rangeMode);
  const filteredSuggestions = filterByRange(suggestions, rangeMode);
  const complaintMetrics = buildComplaintMetrics(filteredComplaints);
  const suggestionMetrics = buildSuggestionMetrics(filteredSuggestions);

  return {
    rangeMode,
    totalRecords: complaints.length + suggestions.length,
    complaintMetrics,
    suggestionMetrics,
    monthlySeries: buildMonthlySeries(complaints, suggestions, rangeMode),
    complaintStatusSeries: buildSeries(
      filteredComplaints,
      COMPLAINT_STATUS_ORDER,
      COMPLAINT_STATUS_LABELS
    ),
    suggestionStatusSeries: buildSeries(
      filteredSuggestions,
      SUGGESTION_STATUS_ORDER,
      SUGGESTION_STATUS_LABELS
    ),
    complaintCategorySeries: buildCategorySeries(
      filteredComplaints,
      COMPLAINT_CATEGORY_LABELS
    ),
    suggestionCategorySeries: buildCategorySeries(
      filteredSuggestions,
      SUGGESTION_CATEGORY_LABELS
    ),
    topComplaintLocations: buildLocationSeries(filteredComplaints, "location"),
    topSuggestionAreas: buildLocationSeries(filteredSuggestions, "area"),
    recentActivity: buildRecentActivity(complaints, suggestions, rangeMode),
  };
};
