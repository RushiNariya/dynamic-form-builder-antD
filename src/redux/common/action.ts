import { CloseModalType, OpenModalType } from './action.type';
import { CommonActionType } from './types';

export const openModal = (): OpenModalType => {
  return {
    type: CommonActionType.OPEN_MODAL,
  };
};

export const closeModal = (): CloseModalType => {
  return {
    type: CommonActionType.CLOSE_MODAL,
  };
};
