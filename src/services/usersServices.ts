import axiosInstance from './axiosInstance';

export const getUsersListApi = (prms: any) =>
  axiosInstance.post('users/list', {
    limit: prms.limit || 5,
    page: prms?.page || 0,
    search: prms?.search || '',
    sort: prms?.sort || '',
    orderBy: prms?.orderBy || '',
    role: prms?.role || '',
  });

export const getUsersListForOrderApi = () => axiosInstance.get('users/data');

export const postUserApi = (reqBody: any) =>
  axiosInstance.post('users/register', reqBody);

export const deleteUserApi = (userId: number) =>
  axiosInstance.delete(`users/delete/${userId}`);

export const updateUserApi = (userId: number, reqBody: any) =>
  axiosInstance.post(`users/update-profile/${userId}`, reqBody);

export const resetPasswordApi = (reqBody: { oldPassword: string; newPassword: string }) =>
  axiosInstance.post('users/reset-password', reqBody);
