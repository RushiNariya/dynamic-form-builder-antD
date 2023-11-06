import { AuthActionTypes } from './types';

export interface SetLoggedInUserActionType {
  type: AuthActionTypes.SET_LOGGED_IN_USER;
  payload: {
    email: any;
    token: string;
    role: string;
  };
}

export interface SetLoggedOutUserActionType {
  type: AuthActionTypes.SET_LOGGED_OUT_USER;
}

export interface RefreshStateActionType {
  type: AuthActionTypes.REFRESH_STATE;
  payload: {
    user: any;
    token: string;
    role: string;
  };
}

export interface SetIsSigningActionType {
  type: AuthActionTypes.SET_IS_SIGNING;
}

export interface ResetIsSigningActionType {
  type: AuthActionTypes.RESET_IS_SIGNING;
}

export interface SetForgetPasswordUserEmailActionType {
  type: AuthActionTypes.SET_FORGET_PASSWORD_USER_EMAIL;
}

export interface ResetForgetPasswordUserEmailActionType {
  type: AuthActionTypes.RESET_FORGET_PASSWORD_USER_EMAIL;
}

export type AuthDispatchActionType =
  | SetLoggedInUserActionType
  | SetLoggedOutUserActionType
  | RefreshStateActionType
  | SetIsSigningActionType
  | ResetIsSigningActionType
  | SetForgetPasswordUserEmailActionType
  | ResetForgetPasswordUserEmailActionType;
