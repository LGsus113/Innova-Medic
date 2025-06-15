import { Navigate } from "react-router-dom";
import { useAuthContext } from "@src/context/AuthContext";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return user ? children : <Navigate to="/" replace />;
}
