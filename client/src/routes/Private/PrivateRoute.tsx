import { ReactNode, Suspense } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

type PrivateRouteProps = {
  children: ReactNode;
  destination: string;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();


  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense fallback="Hello">{children}</Suspense>
    </ErrorBoundary>
  );
};

export default PrivateRoute;
