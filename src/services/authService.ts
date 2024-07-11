import axiosInstance from "../utils/axiosInstance";

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  isDarkMode: boolean;
  isVerified: boolean;
}

export const verifyToken = async (): Promise<UserData> => {
  try {
    const response = await axiosInstance.post("/auth/verify-token");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to verify token");
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const updateUser = async (updatedData: Partial<UserData>) => {
  try {
    const response = await axiosInstance.put("/user/update", updatedData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};
