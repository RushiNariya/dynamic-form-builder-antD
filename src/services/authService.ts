import axiosInstance from './axiosInstance';

export const postLoginApi = (authData: {
  email: string;
  password: string;
  role: string[];
}) => {
  return axiosInstance.post('/auth/login', authData);
};

export const getLogoutApi = () => {
  return axiosInstance.get('/auth/logout');
};

export const postForgotPasswordApi = (userData: { email: string; role: string[] }) => {
  return axiosInstance.post('/auth/send-otp', userData);
};

export const postVerifyOTPApi = (userData: { email: string; otp: string }) =>
  axiosInstance.post('/auth/verify-otp', userData);

export const postResetPasswordApi = (passwordData: {
  email: string;
  password: string;
  otp: string;
}) => {
  return axiosInstance.post('/auth/reset-password', passwordData);
};
