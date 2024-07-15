import React, { ReactNode, useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { Box, LinearProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        const userData = await verifyToken();
        setUser(userData);
      } catch (err) {
        console.error("Failed to verify token:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [setUser]);

  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
