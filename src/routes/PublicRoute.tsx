import { useAuth } from '@hooks/auth/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  return isAuthenticated ? <Navigate to="/" replace/>: <Outlet/>;
}
