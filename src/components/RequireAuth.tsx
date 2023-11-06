import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { selectAuthRole, selectAuthToken } from '../redux/auth/selectors';
import { useSelector } from '../redux/rootStateType';
import { UserRoles } from '../utils/role';

const RequireAuth = ({ allowedRoles = [] }: { allowedRoles: UserRoles[] }) => {
  const token = useSelector(selectAuthToken) || localStorage.getItem('token');
  const role =
    (useSelector(selectAuthRole) as UserRoles) ||
    (localStorage.getItem('role') as UserRoles);

  const location = useLocation();

  return token && role && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
