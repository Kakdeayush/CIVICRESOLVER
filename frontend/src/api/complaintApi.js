import api from "./axios";

// Citizen creates complaint
export const createComplaint = (data) =>
  api.post("/api/complaints", data);

// Citizen views own complaints
export const getMyComplaints = () =>
  api.get("/api/complaints/my");

// Admin views all complaints
export const getAllComplaints = () =>
  api.get("/api/admin/complaints");

// Admin updates complaint status
export const updateComplaintStatus = (id, status) =>
  api.put(`/api/admin/complaints/${id}/status`, { status });

// Admin assigns officer to complaint
export const assignOfficer = (id, data) =>
  api.put(`/api/admin/complaints/${id}/assign`, data);
