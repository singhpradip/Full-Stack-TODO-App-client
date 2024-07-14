import axiosInstance from "../utils/axiosInstance";
import { UserData } from "../types";

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

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to signup");
  }
};

export const verifyAccount = async (otp: string) => {
  try {
    const response = await axiosInstance.post("/auth/register/verify-account", {
      otp,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to verify account"
    );
  }
};

export const updateUser = async (updatedData: FormData) => {
  try {
    const response = await axiosInstance.put("/auth/update-user", updatedData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};
