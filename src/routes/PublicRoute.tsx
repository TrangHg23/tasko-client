import LoadingSpinner from '@components/common/LoadingSpinner';
import { useAuth } from '@hooks/auth/useAuth';
import { Navigate, Outlet } from 'react-router';

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return isAuthenticated ? <Navigate to="/today" replace /> : <Outlet />;
}
