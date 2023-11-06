import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';
import { FormBuilderActionType } from './types';

export interface FormDetailsPayloadType {
  title: string;
  deletedAt: boolean;
  color: string;
  allowedUsers: Array<any>;
}

export interface SelectedFormComponentType {
  type: FormBuilderActionType.SELECTED_FORM_COMPONENT;
  payload: SidebarItemType;
}

export interface SetFormComponentsType {
  type: FormBuilderActionType.SET_FORM_COMPONENTS;
  payload: SidebarItemType[];
}

export interface UpdateFormComponentType {
  type: FormBuilderActionType.UPDATE_FORM_COMPONENT;
  payload: {
    id: string | number;
    data: SidebarItemType;
  };
}

export interface DeleteFormComponentType {
  type: FormBuilderActionType.DELETE_FORM_COMPONENT;
  payload: string | number;
}

export interface SetFormTitleType {
  type: FormBuilderActionType.SET_FORM_TITLE;
  payload: string;
}

export interface SetFormDetailsType {
  type: FormBuilderActionType.SET_FORM_DETAILS;
  payload: FormDetailsPayloadType;
}

export type FormBuilderDispatchActionTypes =
  | SelectedFormComponentType
  | SetFormComponentsType
  | UpdateFormComponentType
  | SetFormTitleType
  | SetFormDetailsType
  | DeleteFormComponentType;
