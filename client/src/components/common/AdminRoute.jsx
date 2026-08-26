import { Navigate, useLocation } from "react-router-dom";

function AdminRoute({ children }) {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const userEmail = localStorage.getItem("userEmail");

  // CHANGE THIS EMAIL IF YOU WANT A DIFFERENT ADMIN EMAIL
  const adminEmail = "admin@furnispace.com";

  const isAdmin =
    isLoggedIn && userEmail?.toLowerCase() === adminEmail.toLowerCase();

  if (!isAdmin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default AdminRoute;
