import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Preloader from './landing/Preloader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Preloader />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

