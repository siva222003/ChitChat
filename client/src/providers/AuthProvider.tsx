import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  ForgotPasswordType,
  LoginType,
  RegisterType,
  ResetPasswordType,
} from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axios.interceptors";
import { UserType } from "../types/user.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
type AuthProviderProps = {
  children: ReactNode;
};

export const getUser = async () => {
  console.log("Fetching User");
  const response = await api.get("/user/me");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/auth/all");
  return response.data;
};

export const login: LoginType = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signup: RegisterType = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

//VerifyOtp

//ForgotPassword
export const forgotPassword: ForgotPasswordType = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

//ResetPassword
export const resetPassword: ResetPasswordType = async ({
  data,
  resetToken,
}) => {
  const response = await api.post(`/auth/reset-password/${resetToken}`, data);
  return response.data;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("accessToken");

  const { isLoading, data, isError} = useQuery({
    queryKey: ["movies"],
    queryFn: getUser,
    enabled: !!token,
  });

  // console.log("isAuthenticated", isAuthenticated);
  console.log(token)

  useEffect(() => {
    if (!isError && data) {
      setUser(data);
      setAuthenticated(true);
    } else if (isError) {
      setAuthenticated(false);
    }
  }, [data, isError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
