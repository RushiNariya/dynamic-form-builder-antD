import { Dispatch } from 'react';
import { toast } from 'react-hot-toast';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  deleteUserApi,
  getUsersListApi,
  postUserApi,
  resetPasswordApi,
  updateUserApi,
} from '../../services/usersServices';
import UserType from '../../types/users.type';
import { RootActionType } from '../rootStateType';
import {
  FetchUsersFailureType,
  FetchUsersRequestType,
  FetchUsersSuccessType,
  ResetChangeUserPasswordType,
  SetChangeUserPasswordType,
} from './action.type';
import { UsersActionType } from './types';

export const fetchUsersRequest = (): FetchUsersRequestType => {
  return {
    type: UsersActionType.FETCH_USERS_REQUEST,
  };
};

export const setChangePassword = (): SetChangeUserPasswordType => {
  return {
    type: UsersActionType.SET_CHANGE_USER_PASSWORD,
  };
};

export const resetChangePassword = (): ResetChangeUserPasswordType => {
  return {
    type: UsersActionType.RESET_CHANGE_USER_PASSWORD,
  };
};

export const fetchUsersSuccess = (
  data: UserType[],
  totalPage: number,
): FetchUsersSuccessType => {
  return {
    type: UsersActionType.FETCH_USERS_SUCCESS,
    payload: { data, totalPage },
  };
};

export const fetchUsersFailure = (error: string): FetchUsersFailureType => {
  return {
    type: UsersActionType.FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsersThunkAction = (
  params: any,
  onSuccess: () => void,
  onError: (error: string) => void,
): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
  return async (dispatch: Dispatch<RootActionType>): Promise<void> => {
    try {
      dispatch(fetchUsersRequest());

      const { data } = await getUsersListApi(params);

      if (data.success !== true) {
        throw new Error(data?.message);
      }

      dispatch(fetchUsersSuccess(data.data.user, data.data.userCount / params.limit));
      onSuccess();
    } catch (error: any) {
      console.log(error?.response?.data?.message || error?.message);
      dispatch(fetchUsersFailure(error?.response?.data?.message || error?.message));
      onError(error?.response?.data?.message || error?.message);
    }
  };
};

export const addNewUserThunkAction = (
  reqBody: any,
  onCreate: () => void,
): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
  return async (): Promise<void> => {
    try {
      const promise = postUserApi(reqBody);

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'User registered successfully.',
        error: (error) =>
          `${
            error?.response?.data?.message || error?.message || 'Internal server Error.'
          }`,
      });

      const { data } = await promise;

      if (data.success !== true) {
        throw new Error(data?.message);
      }

      onCreate();
    } catch (error: any) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
};

export const deleteUserThunkAction = (
  id: number,
  onDelete: () => void,
): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
  return async (): Promise<void> => {
    try {
      const promise = deleteUserApi(id);

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'User deleted successfully.',
        error: (error) =>
          `${
            error?.response?.data?.message || error?.message || 'Internal server Error.'
          }`,
      });

      const { data } = await promise;

      if (data.success !== true) {
        throw new Error(data?.message);
      }

      onDelete();
    } catch (error: any) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
};

export const updateUserThunkAction = (
  id: number,
  reqBody: any,
  onUpdate: () => void,
): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
  return async (): Promise<void> => {
    try {
      const promise = updateUserApi(id, reqBody);

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'User data updated successfully.',
        error: (error) =>
          `${
            error?.response?.data?.message || error?.message || 'Internal server Error.'
          }`,
      });

      const { data } = await promise;

      if (data.success !== true) {
        throw new Error(data?.message);
      }

      onUpdate();
    } catch (error: any) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
};

export const resetUserPasswordThunkAction = (
  oldPassword: string,
  newPassword: string,
  onSuccess: () => void,
): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
  return async (dispatch: Dispatch<RootActionType>): Promise<void> => {
    try {
      dispatch(setChangePassword());
      const promise = resetPasswordApi({ oldPassword, newPassword });

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Password reset successfully.',
        error: (error) =>
          `${
            error?.response?.data?.message || error?.message || 'Internal server Error.'
          }`,
      });

      const { data } = await promise;

      if (data.success !== true) {
        throw new Error(data?.message);
      }

      onSuccess();
      dispatch(resetChangePassword());
    } catch (error: any) {
      dispatch(resetChangePassword());
      console.log(error?.response?.data?.message || error?.message);
    }
  };
};
