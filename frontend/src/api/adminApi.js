import api from "./axios";

export const getAdminDashboard = () => api.get("/api/admin/dashboard");

// Report APIs
export const getDayWiseReport = (dateStr) => {
  const params = dateStr ? { date: dateStr } : {};
  return api.get("/api/admin/reports/day-wise", { params });
};

export const getWeekWiseReport = (dateStr) => {
  const params = dateStr ? { date: dateStr } : {};
  return api.get("/api/admin/reports/week-wise", { params });
};

export const getMonthWiseReport = (year, month) => {
  return api.get("/api/admin/reports/month-wise", { params: { year, month } });
};
