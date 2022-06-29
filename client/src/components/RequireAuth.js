import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import decodeToken from "../helpers/decodeToken";

export default function RequireAuth({ admin }) {
  const location = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = decodeToken(token).is_admin;

  if (admin && !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
