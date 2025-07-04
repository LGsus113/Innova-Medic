import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@src/context/AuthContext";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) return null;

  if (!user && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  return children;
}
