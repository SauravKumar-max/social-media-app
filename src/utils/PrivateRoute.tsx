import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
