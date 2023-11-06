import { v4 as uuidv4 } from 'uuid';

import { SidebarItemType } from '../utils/formbuilder/sidebarItem.type';
import { FormFieldTypes, SIDEBAR_ITEM } from './constants';

export const SIDEBAR_ITEMS: SidebarItemType[] = [
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'text',
    fieldName: FormFieldTypes.SINGLE_LINE,
    deletedAt: false,
    title: 'Single line',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Single line',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'text',
    fieldName: FormFieldTypes.MULTI_LINE,
    deletedAt: false,
    title: 'Multi line',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Multi line',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'number',
    fieldName: FormFieldTypes.NUMBER,
    deletedAt: false,
    title: 'Number',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Number',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'number',
    fieldName: FormFieldTypes.DECIMAL,
    deletedAt: false,
    title: 'Decimal',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Decimal',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'text',
    fieldName: FormFieldTypes.ADDRESS,
    deletedAt: false,
    title: 'Address',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Address',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'number',
    fieldName: FormFieldTypes.PHONE,
    deletedAt: false,
    title: 'Phone',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Phone',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'email',
    fieldName: FormFieldTypes.EMAIL,
    deletedAt: false,
    title: 'Email',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Email',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'date',
    fieldName: FormFieldTypes.DATE,
    deletedAt: false,
    title: 'Date',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Date',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
      disabledWeekDays: [],
      disabledDates: null,
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'time',
    fieldName: FormFieldTypes.TIME,
    deletedAt: false,
    title: 'Time',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Time',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'datetime-local',
    fieldName: FormFieldTypes.DATE_TIME,
    deletedAt: false,
    title: 'Date Time',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Date Time',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'checkbox',
    fieldName: FormFieldTypes.DECISION_BOX,
    deletedAt: false,
    title: 'Decision Box',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Decision Box',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'select',
    fieldName: FormFieldTypes.DROPDOWN,
    deletedAt: false,
    title: 'Dropdown',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Dropdown',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'radio',
    fieldName: FormFieldTypes.RADIO,
    deletedAt: false,
    title: 'Radio',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Radio',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'select',
    fieldName: FormFieldTypes.MULTIPLE_CHOICE,
    deletedAt: false,
    title: 'Multiple choice',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Multiple choice',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'checkbox',
    fieldName: FormFieldTypes.CHECKBOX,
    deletedAt: false,
    title: 'Checkbox',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Checkbox',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'url',
    fieldName: FormFieldTypes.WEBSITE,
    deletedAt: false,
    title: 'Website',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Website',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'number',
    fieldName: FormFieldTypes.CURRENCY,
    deletedAt: false,
    title: 'Currency',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Currency',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'file',
    fieldName: FormFieldTypes.FILE_UPLOAD,
    deletedAt: false,
    title: 'File Upload',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'File Upload',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'file',
    fieldName: FormFieldTypes.IMAGE_UPLOAD,
    deletedAt: false,
    title: 'Image Upload',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Image Upload',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      // isImageOnly: true,
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'text',
    fieldName: FormFieldTypes.SECTION,
    deletedAt: false,
    title: 'Section',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Section',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'rich text editor',
    fieldName: FormFieldTypes.DESCRIPTION,
    deletedAt: false,
    title: 'Description',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Description',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'range',
    fieldName: FormFieldTypes.SLIDER,
    deletedAt: false,
    title: 'Slider',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Slider',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'ratings',
    fieldName: FormFieldTypes.RATINGS,
    deletedAt: false,
    title: 'Ratings',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Ratings',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'google address',
    fieldName: FormFieldTypes.GOOGLE_ADDRESS_FIELD,
    deletedAt: false,
    title: 'Google Address Field',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Google Address Field',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'checkbox',
    fieldName: FormFieldTypes.TERMS_AND_CONDITIONS,
    deletedAt: false,
    title: 'Terms and Conditions',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Terms and Conditions',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
  {
    id: uuidv4(),
    serialNumber: uuidv4(),
    type: SIDEBAR_ITEM,
    inputType: 'text',
    fieldName: FormFieldTypes.SIGNATURE,
    deletedAt: false,
    title: 'Signature',
    response: null,
    allowedUsers: [],
    validations: [],
    details: {
      placeHolder: 'Signature',
      defaultValue: '',
      steps: 1,
      rows: 1,
      showCount: false,
      maxLength: null,
      required: false,
      options: [],
      textCase: '',
    },
  },
];

// page break, unique ID not added