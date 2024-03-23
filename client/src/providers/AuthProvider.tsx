import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import { LoginType } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { QueryKey, useQuery } from "@tanstack/react-query";

type AuthProviderProps = {
  children: ReactNode;
};


//Get User
export const getUser = async () => {
  const response = await axios.get('http://localhost:3000/api/auth/user', {
    headers: {
      auth: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

//Get All Users
export const getAllUsers = async () => {
  const response = await axios.get('http://localhost:3000/api/auth/all',{
    headers: {
      auth: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

//Login
export const login: LoginType = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw err
  }
};

//SignUp

//VerifyOtp

//ForgotPassword

//ResetPassword

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  useEffect(() => {
    if(token){
      setAuthenticated(Boolean(token));
    }
  }, [token,navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
