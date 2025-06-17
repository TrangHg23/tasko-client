import { useAuth } from '@hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';


export default function PrivateRoute() {
   const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
