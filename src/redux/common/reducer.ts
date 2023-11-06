import { CommonDispatchActionTypes } from './action.type';
import { CommonActionType } from './types';

export interface initialCommonStateType {
  open: boolean;
}

const initialCommonState: initialCommonStateType = {
  open: false,
};

const reducer = (state = initialCommonState, action: CommonDispatchActionTypes) => {
  switch (action.type) {
    case CommonActionType.OPEN_MODAL:
      return {
        ...state,
        open: true,
      };
    case CommonActionType.CLOSE_MODAL:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default reducer;
