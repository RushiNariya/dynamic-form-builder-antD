import { v4 as uuidv4 } from 'uuid';

import { ROW } from '../../data/constants';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';
import { FormBuilderDispatchActionTypes } from './action.type';
import { FormBuilderActionType } from './types';

export interface initialFormBuilderStateType {
  id: string | number;
  serialNumber: string | number;
  title: string;
  selectedComponent: null | SidebarItemType;
  createdAt: null;
  updatedAt: null;
  deletedAt: boolean;
  color: string;
  allowedUsers: Array<any>;
  // formLogs: [],
  components: Array<SidebarItemType>;
}

const initialFormBuilderState: initialFormBuilderStateType = {
  id: uuidv4(),
  serialNumber: uuidv4(),
  title: '',
  selectedComponent: null,
  createdAt: null,
  updatedAt: null,
  deletedAt: false,
  color: '#009900',
  allowedUsers: [],
  // formLogs: [],
  components: [],
};

const reducer = (
  state = initialFormBuilderState,
  action: FormBuilderDispatchActionTypes,
) => {
  switch (action.type) {
    case FormBuilderActionType.SELECTED_FORM_COMPONENT:
      return {
        ...state,
        selectedComponent: action.payload,
      };

    case FormBuilderActionType.SET_FORM_COMPONENTS:
      return {
        ...state,
        components: action.payload,
      };

    case FormBuilderActionType.UPDATE_FORM_COMPONENT:
      return {
        ...state,
        components: state.components.map((item: SidebarItemType) => {
          if (item.id === action.payload.id) {
            return action.payload.data;
          }
          return item;
        }),
      };

    case FormBuilderActionType.DELETE_FORM_COMPONENT:
      return {
        ...state,
        components: state.components.filter((item: any) => {
          return item.id !== action.payload;
        }),
      };

    case FormBuilderActionType.SET_FORM_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case FormBuilderActionType.SET_FORM_DETAILS:
      return {
        ...state,
        title: action.payload.title,
        color: action.payload.color,
        deletedAt: action.payload.deletedAt,
        allowedUsers: action.payload.allowedUsers,
      };
    default:
      return { ...state };
  }
};

export default reducer;
