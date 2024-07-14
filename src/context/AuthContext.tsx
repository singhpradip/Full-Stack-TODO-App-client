import React, { createContext, useState, useEffect } from "react";
import * as authService from "../services/authService";
import { useCookies } from "react-cookie";
import { AuthContextType, UserData, AuthProviderProps } from "../types";
import { notifySuccess, notifyError } from "../utils/notification";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  updateUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        if (cookies.accessToken) {
          const userData = await authService.verifyToken();
          setUser(userData);
        }
      } catch (err) {
        console.error("ERROR: ", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [cookies.accessToken]);

  const updateUser = async (updatedData: FormData) => {
    try {
      const response = await authService.updateUser(updatedData);
      notifySuccess("Profile updated successfully");
      const updatedUserData = response.data;
      setUser((prevUser) => ({
        ...prevUser!,
        ...updatedUserData,
      }));
    } catch (error: any) {
      notifyError(error.message);
      console.log("Failed to update user data:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
