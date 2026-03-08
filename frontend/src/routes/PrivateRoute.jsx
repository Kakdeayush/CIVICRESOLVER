import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
};

export default PrivateRoute;
