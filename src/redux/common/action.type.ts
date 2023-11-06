import { CommonActionType } from './types';

export interface OpenModalType {
  type: CommonActionType.OPEN_MODAL;
}

export interface CloseModalType {
  type: CommonActionType.CLOSE_MODAL;
}

export type CommonDispatchActionTypes = OpenModalType | CloseModalType;
