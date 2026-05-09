import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div>인증 상태 확인 중...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
