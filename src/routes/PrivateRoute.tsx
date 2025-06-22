import { useAuth } from '@hooks/auth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';


export default function PrivateRoute() {
   const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
