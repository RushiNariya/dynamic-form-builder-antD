import { DemoActionTypes } from './action.type';
import { DemoActionType } from './types';

export interface initialStateType {
  count: number;
}

const initialState: initialStateType = {
  count: 0,
};

const demoReducer = (state = initialState, action: DemoActionTypes) => {
  switch (action.type) {
    case DemoActionType.INCREMENT:
      return {
        ...state,
        count: action.payload,
      };

    case DemoActionType.DECREMENT:
      return {
        ...state,
        count: action.payload.count,
      };

    case DemoActionType.INCREMENT_ASYNC:
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
};

export default demoReducer;
