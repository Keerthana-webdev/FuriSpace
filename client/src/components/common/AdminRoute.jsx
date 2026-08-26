import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const userEmail = localStorage.getItem("userEmail");

  const isAdmin = isLoggedIn && userEmail === "admin@furnispace.com";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;
