import React, { FormEvent, useEffect, useMemo, useState } from 'react';

import { AccessOf, AccessType, FormFieldTypes } from '../../data/constants';
import validationOptions from '../../data/formFieldValidation';
import { SIDEBAR_ITEMS } from '../../data/formSidebarData';
import {
  allUsersOptions,
  disableDatesOptions,
  disableWeekDayOptions,
} from '../../data/selectFieldOptions';
import useSeparateFormUsers from '../../hooks/useSeparateFormUsers';
import { closeModal } from '../../redux/common/action';
import { updateFormComponent } from '../../redux/formBuider/action';
import { selectFormComponent } from '../../redux/formBuider/selectors';
import { useDispatch, useSelector } from '../../redux/rootStateType';
import { ComponentValidationType } from '../../utils/formbuilder/componentValidation.type';
import {
  DisableDatesType,
  SidebarItemType,
  UsersType,
} from '../../utils/formbuilder/sidebarItem.type';
import ContainedButton from '../Buttons/ContainedButton';
import OutlineButton from '../Buttons/OutlineButton';
import CheckboxField from './Components/Builder/CheckboxField';
import DateField from './Components/Builder/DateField';
import DateRangeField from './Components/Builder/DateRangeField';
import InputField from './Components/Builder/InputField';
import InputNumberField from './Components/Builder/InuptNumberField';
import SelectField from './Components/Builder/SelectField';

const initialUsers: UsersType = {
  editableUsers: [],
  viewableUsers: [],
};

function Date() {
  const dispatch = useDispatch();
  const formComponent = useSelector(selectFormComponent);
  const { editableUsers, viewableUsers } = useSeparateFormUsers(
    formComponent ? formComponent.allowedUsers : [],
  );

  const initialData = useMemo(() => {
    return SIDEBAR_ITEMS.find((item) => item.fieldName === FormFieldTypes.DATE);
  }, [SIDEBAR_ITEMS]);

  const validationData = useMemo(() => {
    return validationOptions.filter((item) => {
      return item.fieldName.includes(FormFieldTypes.DATE);
    });
  }, [validationOptions]);

  const [localData, setLocalData] = useState<SidebarItemType>(
    initialData as SidebarItemType,
  );
  const [localValidationData, setLocalValidationData] = useState<
    ComponentValidationType[]
  >([...validationData]);
  const [users, setUsers] = React.useState<UsersType>({ ...initialUsers });

  useEffect(() => {
    if (formComponent) {
      setLocalData((data: SidebarItemType) => ({
        ...data,
        ...formComponent,
      }));
      if (formComponent.validations.length) {
        setLocalValidationData([...formComponent.validations]);
      }
    }
  }, [formComponent]);

  useEffect(() => {
    setUsers((data: UsersType) => ({
      ...data,
      editableUsers,
      viewableUsers,
    }));
  }, [editableUsers, viewableUsers]);

  const handleChange = (key: string, value: string) => {
    setLocalData((data: SidebarItemType) => ({ ...data, [key]: value }));
  };

  const setProperty = (obj: any, path: string, value: any): any => {
    const [head, ...rest] = path.split('.');

    return {
      ...obj,
      [head]: rest.length ? setProperty(obj[head], rest.join('.'), value) : value,
    };
  };

  const handleOneNestedChange = (key: string, value: any) => {
    setLocalData((data: SidebarItemType) =>
      setProperty(JSON.parse(JSON.stringify(data)), key, value),
    );
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const editors = users.editableUsers.map((user: any) => {
      return {
        ...user,
        accessType: AccessType.Edit,
        accessOf: AccessOf.Component,
        userId: user.id,
        accessId: formComponent!.id,
      };
    });

    const viewers = users.viewableUsers.map((user: any) => {
      return {
        ...user,
        accessType: AccessType.View,
        accessOf: AccessOf.Component,
        userId: user.id,
        accessId: formComponent!.id,
      };
    });
    const updatedData = {
      ...localData,
      validations: [...localValidationData],
      allowedUsers: [...editors, ...viewers],
    };
    dispatch(updateFormComponent(formComponent!.id, updatedData));
    setLocalData(initialData as SidebarItemType);
    setLocalValidationData([...validationData]);
    setUsers({ ...initialUsers });
    dispatch(closeModal());
  };

  const cancelHandler = () => {
    setLocalData(initialData as SidebarItemType);
    setLocalValidationData([...validationData]);
    setUsers({ ...initialUsers });
    dispatch(closeModal());
  };

  const handleValidationActiveChange = (id: number, key: string, value: boolean) => {
    setLocalValidationData((data: ComponentValidationType[]) =>
      data.map((item: ComponentValidationType) => {
        if (item.id === id) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      }),
    );
  };

  const handleValidationChange = (
    id: number,
    paramIndex: number,
    value: number | string,
  ) => {
    setLocalValidationData((data: ComponentValidationType[]) =>
      data.map((item: ComponentValidationType) => {
        if (item.id === id) {
          return {
            ...item,
            params: item.params.map((item: any, index: number) => {
              if (index === paramIndex) {
                return value;
              }
              return item;
            }),
          };
        }
        return item;
      }),
    );
  };

  const handlerUserAccess = (key: string, value: Array<any>) => {
    setUsers((data: UsersType) => ({
      ...data,
      [key]: value,
    }));
  };

  return (
    <div className="px-3 py-2">
      <form onSubmit={submitHandler}>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Date </h3>
          <div className="flex gap-2">
            <ContainedButton onClickHandler={() => cancelHandler()}>
              Cancel
            </ContainedButton>

            <OutlineButton type="submit">
              <span className="text-[0.9rem]">Save</span>
            </OutlineButton>
          </div>
        </div>
        <div className="w-full space-y-0.5 mb-3">
          <InputField
            value={localData.title}
            onChange={(value: string) => handleChange('title', value)}
            label={'Label'}
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <InputField
            value={localData.details.placeHolder}
            onChange={(value: string) =>
              handleOneNestedChange('details.placeHolder', value)
            }
            label={'Place Holder'}
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <DateField
            value={localData.details?.defaultValue}
            onChange={(value: any) =>
              handleOneNestedChange('details.defaultValue', value)
            }
            label={'Default Value'}
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <SelectField
            placeHolder="Disable Week Day"
            options={[...disableWeekDayOptions]}
            value={localData.details?.disabledWeekDays || []}
            onChange={(items: Array<any>) =>
              handleOneNestedChange('details.disabledWeekDays', items)
            }
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <SelectField
            isMulti={false}
            placeHolder="Disable Dates"
            options={[...disableDatesOptions]}
            value={localData.details?.disabledDates}
            onChange={(items: Array<any>) =>
              handleOneNestedChange('details.disabledDates', items)
            }
          />
        </div>

        {localData.details.disabledDates &&
        [DisableDatesType.START_FROM, DisableDatesType.END_TO].includes(
          localData.details.disabledDates?.value,
        ) ? (
          <div className="w-full space-y-0.5 mb-3">
            <DateField
              value={localData.details?.disabledDates?.date}
              onChange={(value: number | null) =>
                handleOneNestedChange('details.disabledDates.date', value)
              }
              label={localData.details.disabledDates.label}
            />
          </div>
        ) : null}

        {localData.details.disabledDates &&
        [DisableDatesType.RANGE].includes(
          localData.details.disabledDates?.value || '',
        ) ? (
          <div className="w-full space-y-0.5 mb-3">
            <DateRangeField
              value={localData.details?.disabledDates.date}
              onChange={(value: number | null) =>
                handleOneNestedChange('details.disabledDates.date', value)
              }
              label={localData.details.disabledDates.label}
            />
          </div>
        ) : null}

        <div className="w-full space-y-0.5 mb-3">
          <SelectField
            placeHolder="Editable Users"
            options={[...allUsersOptions]}
            value={users.editableUsers}
            onChange={(items: Array<any>) => handlerUserAccess('editableUsers', items)}
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <SelectField
            placeHolder="Viewable Users"
            options={[...allUsersOptions]}
            value={users.viewableUsers}
            onChange={(items: Array<any>) => handlerUserAccess('viewableUsers', items)}
          />
        </div>

        <h4 className="my-4">validations</h4>

        {localValidationData.map((item: ComponentValidationType) => {
          if (item.inputType === 'text') {
            return (
              <div key={item.id} className="">
                <div className="w-full space-y-0.5 mb-3 grid grid-cols-12 gap-2 justify-start items-center">
                  <div className="flex items-center col-span-5">
                    <CheckboxField
                      value={item.active}
                      onChange={(value: boolean) =>
                        handleValidationActiveChange(item.id, 'active', value)
                      }
                      label={''}
                    />
                    <InputField
                      required
                      value={item.params[0]}
                      disabled={!item.active}
                      onChange={(value: string) =>
                        handleValidationChange(item.id, 0, value)
                      }
                      label={item.title}
                    />
                  </div>
                  <div className="col-span-7">
                    <InputField
                      required
                      value={item.params[1]}
                      disabled={!item.active}
                      onChange={(value: string) =>
                        handleValidationChange(item.id, 1, value)
                      }
                      label={'Error message'}
                    />
                  </div>
                </div>
              </div>
            );
          }
          if (item.inputType === 'checkbox') {
            return (
              <div className="w-full space-y-0.5 mb-3" key={item.id}>
                <CheckboxField
                  value={item.active}
                  onChange={(value: boolean) =>
                    handleValidationActiveChange(item.id, 'active', value)
                  }
                  label={item.title}
                />
              </div>
            );
          }
          if (item.inputType === 'number') {
            return (
              <div key={item.id} className="">
                <div className="w-full space-y-0.5 mb-3 grid grid-cols-12 gap-2 justify-start items-center">
                  <div className="flex items-center col-span-5">
                    <CheckboxField
                      value={item.active}
                      onChange={(value: boolean) =>
                        handleValidationActiveChange(item.id, 'active', value)
                      }
                      label={''}
                    />
                    <InputNumberField
                      value={item.params[0]}
                      required
                      disabled={!item.active}
                      onChange={(value: number) =>
                        handleValidationChange(item.id, 0, value)
                      }
                      label={item.title}
                    />
                  </div>
                  <div className="col-span-7">
                    <InputField
                      value={item.params[1]}
                      required
                      disabled={!item.active}
                      onChange={(value: string) =>
                        handleValidationChange(item.id, 1, value)
                      }
                      label={'Error message'}
                    />
                  </div>
                </div>
              </div>
            );
          }
          return <div key={item.id}>nothing</div>;
        })}
      </form>
    </div>
  );
}

export default Date;
