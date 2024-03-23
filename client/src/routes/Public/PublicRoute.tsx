import { ReactNode, Suspense } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense fallback="login">{children}</Suspense>
    </ErrorBoundary>
  );
};

export default PublicRoute;
