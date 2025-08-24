import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? <>{children}</> : <Navigate to="/" state={{ from: location.pathname }} replace />;
}

export function VerifiedOrLoginRoute({ allowIf, children }: { allowIf: "otpPending"; children: React.ReactNode }) {
  const { stage, isLoggedIn } = useAuth();
  if (allowIf === "otpPending") {
    if (stage === "otpPending") return <>{children}</>;
    if (isLoggedIn) return <Navigate to="/details-1" replace />;
    return <Navigate to="/register" replace />;
  }
  return <>{children}</>;
}
