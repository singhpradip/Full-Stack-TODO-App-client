import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as authService from "../services/authService";
import { useCookies } from "react-cookie";

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  isDarkMode: boolean;
  isVerified: boolean;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  setUser: (user: UserData | null) => void;
  updateUser: (updatedData: Partial<UserData>) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

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

  const updateUser = async (updatedData: Partial<UserData>) => {
    try {
      const updatedUserData = await authService.updateUser(updatedData);
      setUser((prevUser) => ({
        ...prevUser!,
        ...updatedUserData,
      }));
    } catch (error: any) {
      console.log("Failed to update user data:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
