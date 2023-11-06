import {
  TypedUseSelectorHook,
  useDispatch as useGenericDispatch,
  useSelector as useGenericSelector,
} from 'react-redux';
import { Dispatch } from 'redux';

import { AuthDispatchActionType } from './auth/action.type';
import { CommonDispatchActionTypes } from './common/action.type';
import { DemoActionTypes } from './demo/action.type';
import { FormBuilderDispatchActionTypes } from './formBuider/action.type';
import rootReducer from './rootReducer';
import { UsersDispatchActionTypes } from './users/action.type';

export type RootStateType = ReturnType<typeof rootReducer>;
export type RootActionType =
  | DemoActionTypes
  | AuthDispatchActionType
  | UsersDispatchActionTypes
  | FormBuilderDispatchActionTypes
  | CommonDispatchActionTypes;

export const useSelector: TypedUseSelectorHook<RootStateType> = useGenericSelector;

export const useDispatch: () => Dispatch<RootActionType> = useGenericDispatch;
