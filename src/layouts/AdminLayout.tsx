import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import RequireAuth from '../components/RequireAuth';
import Sidebar from '../components/Sidebar/Sidebar';
import toggleContext from '../context';
import ChangePassword from '../pages/auth/ChangePassword';
import FormBuilder from '../pages/formBuilder/FormBuilder';
import NotFound from '../pages/notFound/NotFound';
import Users from '../pages/users/Users';
import adminSidebarRoutes from '../routes/sidebar';
import { UserRoles } from '../utils/role';

function AdminLayout() {
  const [isOpen, setIsOpen] = React.useState(true);
  const { pathname } = useLocation();

  const isBuilderPage = pathname.includes('builder');

  return (
    <>
      <toggleContext.Provider
        value={{
          isOpen,
          setIsOpen,
        }}
      >
        {!isBuilderPage ? <Sidebar routes={adminSidebarRoutes} /> : null}
        <div
          className={
            !isBuilderPage ? (isOpen ? 'sidecontainer' : 'sidecontainerclose') : ''
          }
        >
          <Navbar />
          <div className="">
            <Routes>
              <Route element={<RequireAuth allowedRoles={[UserRoles.ADMIN]} />}>
                <Route path="/" element={<Navigate to={'/admin/users'} replace />} />
                <Route path="users" element={<Users />} />
                <Route path="form-builder" element={<FormBuilder />} />

                <Route path="change-password" element={<ChangePassword />} />
                <Route
                  path="/unauthorized"
                  element={
                    <NotFound
                      statusCode="403"
                      message="Sorry, you have no privilege to view this page."
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
      </toggleContext.Provider>
    </>
  );
}

export default AdminLayout;
