import UserType from '../../types/users.type';
import { UsersActionType } from './types';

export interface FetchUsersRequestType {
  type: UsersActionType.FETCH_USERS_REQUEST;
}

export interface FetchUsersSuccessType {
  type: UsersActionType.FETCH_USERS_SUCCESS;
  payload: {
    data: UserType[];
    totalPage: number;
  };
}

export interface FetchUsersFailureType {
  type: UsersActionType.FETCH_USERS_FAILURE;
  payload: string;
}

export interface SetChangeUserPasswordType {
  type: UsersActionType.SET_CHANGE_USER_PASSWORD;
}

export interface ResetChangeUserPasswordType {
  type: UsersActionType.RESET_CHANGE_USER_PASSWORD;
}

export type UsersDispatchActionTypes =
  | FetchUsersRequestType
  | FetchUsersSuccessType
  | FetchUsersFailureType
  | SetChangeUserPasswordType
  | ResetChangeUserPasswordType;
