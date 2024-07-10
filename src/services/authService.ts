import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "react-query";

export const verifyToken = async () => {
  const { data } = await axiosInstance.post("/auth/verify-token");
  return data;
};

export const useVerifyToken = () => {
  return useQuery("verifyToken", verifyToken, {
    retry: false,
  });
};
