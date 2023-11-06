import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import RequireAuth from '../components/RequireAuth';
import Sidebar from '../components/Sidebar/Sidebar';
import toggleContext from '../context';
import ChangePassword from '../pages/auth/ChangePassword';
import NotFound from '../pages/notFound/NotFound';
import Users from '../pages/users/Users';
import adminSidebarRoutes from '../routes/sidebar';
import { UserRoles } from '../utils/role';

function EditorLayout() {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <toggleContext.Provider
        value={{
          isOpen,
          setIsOpen,
        }}
      >
        <Sidebar routes={adminSidebarRoutes} />
        <div className={isOpen ? 'sidecontainer' : 'sidecontainerclose'}>
          <Navbar />
          <div className="p-2">
            <Routes>
              <Route element={<RequireAuth allowedRoles={[UserRoles.EDITOR]} />}>
                <Route path="/" element={<Navigate to={'/editor/users'} replace />} />
                <Route path="users" element={<Users />} />

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

export default EditorLayout;
