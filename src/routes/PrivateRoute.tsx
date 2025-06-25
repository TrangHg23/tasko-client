import LoadingSpinner from '@components/common/LoadingSpinner';
import { useAuth } from '@hooks/auth/useAuth';
import { Navigate, Outlet } from 'react-router';


export default function PrivateRoute() {
   const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
