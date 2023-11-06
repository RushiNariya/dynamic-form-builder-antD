import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import RestrictedAuth from '../components/RestrictedAuth';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Login from '../pages/auth/Login';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyOTP from '../pages/auth/VerifyOTP';

function AuthLayout() {
  return (
    <Routes>
      <Route element={<RestrictedAuth restricted={true} />}>
        <Route path="login" element={<Login />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="verifyotp" element={<VerifyOTP />} />

        <Route path="*" element={<Navigate to={`/auth/login`} replace />} />
      </Route>
    </Routes>
  );
}

export default AuthLayout;
