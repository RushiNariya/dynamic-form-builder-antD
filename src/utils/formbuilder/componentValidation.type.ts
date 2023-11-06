import { FormFieldTypes } from '../../data/constants';

export interface ComponentValidationType {
  id: number;
  type: string;
  params: Array<any>;
  inputType: string;
  fieldName: Array<FormFieldTypes>;
  title: string;
  active: boolean;
}
