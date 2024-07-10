import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useVerifyToken } from "../services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data, isLoading, isError } = useVerifyToken();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data?.isSuccess) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
