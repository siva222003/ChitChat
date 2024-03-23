import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGNUP_ROUTE,
  VERIFY_OTP_ROUTE,
} from "../utils/constants";
import PrivateRoute from "./Private/PrivateRoute";
import PublicRoute from "./Public/PublicRoute";
import Test from "../pages/Test";
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Otp = React.lazy(() => import("../pages/Otp"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));

const Router = () => {
  return (
    <Routes>
      <Route
        path={HOME_ROUTE}
        element={
          <PrivateRoute destination="/">
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path={LOGIN_ROUTE}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path={SIGNUP_ROUTE}
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path={VERIFY_OTP_ROUTE}
        element={
          <PublicRoute>
            <Otp />
          </PublicRoute>
        }
      />

      <Route
        path={FORGOT_PASSWORD_ROUTE}
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path={RESET_PASSWORD_ROUTE}
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      <Route
        path='/test'
        element={
            <Test />
        }
      />
    </Routes>
  );
};

export default Router;
