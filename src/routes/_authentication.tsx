import {
  createFileRoute,
  Navigate,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useAuthentication } from "../contexts/AuthContext";

export const Route = createFileRoute("/_authentication")({
  component: () => {
    const { state } = useAuthentication();
    const { pathname } = useLocation();

    if (!state.isAuthenticated) {
      return <Navigate to="/login" search={{ redirect: pathname }} replace />;
    }

    return <Outlet />;
  },
});
