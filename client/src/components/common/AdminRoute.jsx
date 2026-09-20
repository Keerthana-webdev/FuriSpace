import { Navigate, useLocation } from "react-router-dom";

function AdminRoute({ children }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Logged in but not an admin
  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Logged in admin
  return children;
}

export default AdminRoute;
