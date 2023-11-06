import { RootStateType } from '../rootStateType';

export const selectFormBuilder = (state: RootStateType) => state.formBuilder;

export const selectFormFields = (state: RootStateType) =>
  selectFormBuilder(state).components;

export const selectFormTitle = (state: RootStateType) => selectFormBuilder(state).title;

export const selectFormComponent = (state: RootStateType) =>
  selectFormBuilder(state).selectedComponent;
