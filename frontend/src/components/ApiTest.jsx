import { useState } from "react";
import api from "../api/axios";

export default function ApiTest() {
  const [publicData, setPublicData] = useState("");
  const [protectedData, setProtectedData] = useState("");
  const [error, setError] = useState("");

  // 1. Public API (no token)
  const fetchPublic = async () => {
    try {
      const res = await api.get("/api/complaints/public");
      setPublicData(JSON.stringify(res.data));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // 2. Protected API (JWT required)
  const fetchProtected = async () => {
    try {
      const res = await api.get("/api/test/user");
      setProtectedData(JSON.stringify(res.data));
      setError("");
    } catch (err) {
      setError("Unauthorized or backend error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>API Test</h1>

      <div>
        <button onClick={fetchPublic}>Fetch Public API</button>
        <p>{publicData}</p>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={fetchProtected}>Fetch Protected API</button>
        <p>{protectedData}</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
