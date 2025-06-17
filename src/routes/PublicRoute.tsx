import { useAuth } from '@hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  return isAuthenticated ? <Navigate to="/" replace/>: <Outlet/>;
}
