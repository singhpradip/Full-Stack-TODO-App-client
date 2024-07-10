import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { verifyToken } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, setUser } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["accessToken"]);
  console.log(user);

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        if (!cookies.accessToken) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await verifyToken();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to verify token:", err);
        setUser(null);
        setLoading(false);
      }
    };

    checkToken();
  }, [cookies.accessToken, setUser]);

  if (loading) {
    return (
      <div>
        <h1>Loading..</h1>;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
