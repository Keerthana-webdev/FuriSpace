import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const isAdmin = false;
    return isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;