import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';
import {
  DeleteFormComponentType,
  FormDetailsPayloadType,
  SelectedFormComponentType,
  SetFormComponentsType,
  SetFormDetailsType,
  SetFormTitleType,
  UpdateFormComponentType,
} from './action.type';
import { FormBuilderActionType } from './types';

export const selectedFormComponent = (
  data: SidebarItemType,
): SelectedFormComponentType => {
  return {
    type: FormBuilderActionType.SELECTED_FORM_COMPONENT,
    payload: data,
  };
};

export const setFormComponents = (data: SidebarItemType[]): SetFormComponentsType => {
  return {
    type: FormBuilderActionType.SET_FORM_COMPONENTS,
    payload: data,
  };
};

export const updateFormComponent = (
  id: string | number,
  data: SidebarItemType,
): UpdateFormComponentType => {
  return {
    type: FormBuilderActionType.UPDATE_FORM_COMPONENT,
    payload: { id, data },
  };
};

export const deleteFormComponent = (id: string | number): DeleteFormComponentType => {
  return {
    type: FormBuilderActionType.DELETE_FORM_COMPONENT,
    payload: id,
  };
};

export const setFormTitle = (title: string): SetFormTitleType => {
  return {
    type: FormBuilderActionType.SET_FORM_TITLE,
    payload: title,
  };
};

export const setFormDetails = (data: FormDetailsPayloadType): SetFormDetailsType => {
  return {
    type: FormBuilderActionType.SET_FORM_DETAILS,
    payload: data,
  };
};
