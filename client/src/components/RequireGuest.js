import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireGuest() {
  const { token } = useAuth();

  if (!token) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
