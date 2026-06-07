import api from "./axios";

export const createSuggestion = (data) => api.post("/api/suggestions", data);

export const getMySuggestions = () => api.get("/api/suggestions/my");

export const getPublicSuggestions = () => api.get("/api/suggestions/public");

// Admin views all suggestions
export const getAllSuggestions = () => api.get("/api/admin/suggestions");

// Admin updates suggestion status
export const updateSuggestionStatus = (id, status) =>
  api.put(`/api/admin/suggestions/${id}/status`, { status });
