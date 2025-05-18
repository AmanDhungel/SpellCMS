import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);

  if (token === undefined) return <div>Loading...</div>;

  if (!token || token === undefined) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
