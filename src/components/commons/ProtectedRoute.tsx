import { Navigate, Outlet } from 'react-router-dom';

const hasAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  return !!token && token.trim().length > 0;
};

const ProtectedRoute = () => {
  if (!hasAccessToken()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
