import { ReactNode, Suspense, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HOME_ROUTE } from "../../utils/constants";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("Public Route - is Authenticated", isAuthenticated);

  if (isLoading) return <p>Loading...</p>;
  if (isAuthenticated) return <Navigate to={HOME_ROUTE} />;
  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense fallback="login">{children}</Suspense>
    </ErrorBoundary>
  );
};

export default PublicRoute;
