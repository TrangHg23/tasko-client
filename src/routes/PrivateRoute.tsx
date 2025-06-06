import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';


export default function PrivateRoute({children} : {children: React.ReactNode}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace/>;
}
