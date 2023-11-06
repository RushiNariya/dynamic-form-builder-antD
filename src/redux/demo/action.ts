import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootActionType } from '../rootStateType';
import {
  DecrementActionPayloadType,
  DecrementActionType,
  IncrementActionType,
  IncrementAsyncActionType,
} from './action.type';
import { DemoActionType } from './types';

export const increment = (data: number): IncrementActionType => {
  return {
    type: DemoActionType.INCREMENT,
    payload: data,
  };
};

export const decrement = (data: DecrementActionPayloadType): DecrementActionType => {
  return {
    type: DemoActionType.DECREMENT,
    payload: {
      count: data.count,
    },
  };
};

export const incrementAsync = (data: number): IncrementAsyncActionType => {
  return {
    type: DemoActionType.INCREMENT_ASYNC,
    payload: data,
  };
};

export const incrementAsyncThunkAction = (
  data: number,
): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
  return async (dispatch: Dispatch<RootActionType>): Promise<void> => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(data);
        }, 3000);
      });
      dispatch(incrementAsync(response as number));
    } catch (error) {
      console.log(error);
    }
  };
};
