import UserType from '../../types/users.type';
import { UsersDispatchActionTypes } from './action.type';
import { UsersActionType } from './types';

export interface initialUsersStateType {
  isLoading: boolean;
  users: Array<UserType>;
  error: string | null;
  totalPage: number;
  isSubmitting: boolean;
}

const initialUsersState: initialUsersStateType = {
  isLoading: false,
  users: [],
  error: null,
  totalPage: 0,
  isSubmitting: false,
};

const usersReducer = (state = initialUsersState, action: UsersDispatchActionTypes) => {
  switch (action.type) {
    case UsersActionType.FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UsersActionType.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        isLoading: false,
        totalPage: action.payload.totalPage,
      };

    case UsersActionType.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        isLoading: false,
        totalPage: 0,
      };

    case UsersActionType.SET_CHANGE_USER_PASSWORD:
      return {
        ...state,
        isSubmitting: true,
      };

    case UsersActionType.RESET_CHANGE_USER_PASSWORD:
      return {
        ...state,
        isSubmitting: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
