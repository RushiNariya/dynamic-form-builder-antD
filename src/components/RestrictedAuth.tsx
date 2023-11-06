import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { selectAuthRole, selectAuthToken } from '../redux/auth/selectors';
import { useSelector } from '../redux/rootStateType';
import { defaultHomePage, UserRoles } from '../utils/role';

const RestrictedAuth = ({ restricted = false }) => {
  const token = useSelector(selectAuthToken) || localStorage.getItem('token');
  const role =
    (useSelector(selectAuthRole) as UserRoles) ||
    (localStorage.getItem('role') as UserRoles);

  const location = useLocation();

  return token && restricted ? (
    <Navigate to={`${defaultHomePage(role)}`} replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default RestrictedAuth;
