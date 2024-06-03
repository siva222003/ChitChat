import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  ForgotPasswordType,
  LoginType,
  RegisterType,
  ResetPasswordType,
  VerifyOtpType,
} from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { UserType } from "../types/user.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

type AuthProviderProps = {
  children: ReactNode;
};

export const getUser = async () => {
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
export const verifyOtp : VerifyOtpType  = async (data) => {
  const response = await api.post("/auth/verify-otp", {
    email : localStorage.getItem('email') || "",
    otp : data.otp
  });
  localStorage.removeItem('email')
  return response.data;
};

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
  const [user, setUser] = useState<UserType | null>(null);

  const token = localStorage.getItem("accessToken");

  const { isLoading, data, isError ,isSuccess} = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnMount: false,
    retry : false
  });

  // console.log(user)
  // console.log('AuthProvder',isAuthenticated)

  useEffect(() => {

    if (!token) {
      setAuthenticated(false);
    } else if (isSuccess && data) {
      setUser(data.data);
      setAuthenticated(true);
    } else if (isError) {
      setAuthenticated(false);
    }
  }, [data, isError,isSuccess]);

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
