import { FormFieldTypes, ROW, SIDEBAR_ITEM } from '../../data/constants';
import { ComponentValidationType } from './componentValidation.type';

export enum DisableDatesType {
  ALL_PAST_DATES = 'all past dates',
  ALL_FUTURE_DATES = 'all future dates',
  START_FROM = 'start from',
  END_TO = 'end to',
  RANGE = 'range',
}

export interface SidebarItemType {
  id: string | number;
  serialNumber: string | number;
  type: typeof SIDEBAR_ITEM | typeof ROW;
  inputType: string;
  fieldName: FormFieldTypes;
  deletedAt: boolean;
  title: string;
  response: any;
  allowedUsers: Array<any>;
  validations: Array<ComponentValidationType>;
  details: {
    placeHolder: string;
    defaultValue: string | number | Date | null;
    steps: number;
    rows: number | null;
    showCount: boolean;
    maxLength: null | number;
    required: boolean;
    options: Array<any>;
    textCase: string;
    disabledWeekDays?: Array<number>;
    disabledDates?: null | {
      label: string;
      value: DisableDatesType;
      date: string | string[];
    };
  };
}

export interface UsersType {
  editableUsers: Array<any>;
  viewableUsers: Array<any>;
}
