import './assets/css/App.css';

import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import EditorLayout from './layouts/EditorLayout';
import SubAdminLayout from './layouts/SubAdminLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import ViewerLayout from './layouts/ViewerLayout';
import { refreshState } from './redux/auth/action';
import { selectAuthRole, selectAuthToken } from './redux/auth/selectors';
import { useDispatch, useSelector } from './redux/rootStateType';
import {
  defaultHomePage,
  defaultNotFoundPage,
  defaultUnauthorizedPage,
  UserRoles,
} from './utils/role';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector(selectAuthToken) || localStorage.getItem('token');
  const role =
    (useSelector(selectAuthRole) as UserRoles) ||
    (localStorage.getItem('role') as UserRoles);

  const refreshStateHandler = () => {
    const token = localStorage.getItem('token')!;
    const role = localStorage.getItem('role')!;
    const user = JSON.parse(localStorage.getItem('user')!) || '';
    dispatch(refreshState({ token, user, role }));
  };

  useEffect(() => {
    refreshStateHandler();
  }, []);

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/super-admin/*" element={<SuperAdminLayout />} />
      <Route path="/sub-admin/*" element={<SubAdminLayout />} />
      <Route path="/editor/*" element={<EditorLayout />} />
      <Route path="/viewer/*" element={<ViewerLayout />} />
      {token ? (
        <Route
          path="/"
          element={
            <Navigate
              to={`${defaultHomePage(role)}`}
              replace
              state={{ from: location }}
            />
          }
        />
      ) : (
        <Route path="/" element={<Navigate to="/auth/login" />} />
      )}

      <Route
        path="/unauthorized"
        element={
          <Navigate
            to={`${defaultUnauthorizedPage(role)}`}
            replace
            state={{ from: location }}
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to={`${defaultNotFoundPage(role)}`}
            replace
            state={{ from: location }}
          />
        }
      />
    </Routes>
  );
}

export default App;
