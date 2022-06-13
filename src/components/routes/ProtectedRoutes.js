import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoutes = ({ isLogged }) => {
  return isLogged ? <Navigate to="/" /> : <Outlet />;
};
