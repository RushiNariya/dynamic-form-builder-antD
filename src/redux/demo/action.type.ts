import { DemoActionType } from './types';

export interface IncrementActionType {
  type: DemoActionType.INCREMENT;
  payload: number;
}

export interface IncrementAsyncActionType {
  type: DemoActionType.INCREMENT_ASYNC;
  payload: number;
}

export interface DecrementActionPayloadType {
  count: number;
}
export interface DecrementActionType {
  type: DemoActionType.DECREMENT;
  payload: DecrementActionPayloadType;
}

export type DemoActionTypes =
  | IncrementActionType
  | DecrementActionType
  | IncrementAsyncActionType;
