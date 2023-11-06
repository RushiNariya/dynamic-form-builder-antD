/* eslint-disable jsx-a11y/label-has-associated-control */
import { Input, Modal, Select, Switch } from 'antd';
import React, { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ContainedButton from '../../components/Buttons/ContainedButton';
import OutlineButton from '../../components/Buttons/OutlineButton';
import { AccessOf, AccessType } from '../../data/constants';
import useSeparateFormUsers from '../../hooks/useSeparateFormUsers';
import { setFormDetails } from '../../redux/formBuider/action';
import { selectFormBuilder } from '../../redux/formBuider/selectors';
import { useSelector } from '../../redux/rootStateType';
import { UsersType } from '../../utils/formbuilder/sidebarItem.type';

const options = [
  {
    id: 1,
    label: 'rushia',
    value: 'rushia',
  },
  {
    id: 2,
    label: 'rushi',
    value: 'rushi',
  },
  {
    id: 3,
    label: 'rushi1',
    value: 'rushi1',
  },
  {
    id: 4,
    label: 'rushi2',
    value: 'rushi2',
  },
  {
    id: 5,
    label: 'rushi3',
    value: 'rushi3',
  },
  {
    id: 6,
    label: 'rushi4',
    value: 'rushi4',
  },
  {
    id: 7,
    label: 'rushi5',
    value: 'rushi5',
  },
  {
    id: 8,
    label: 'rushi6',
    value: 'rushi6',
  },
  {
    id: 9,
    label: 'rushi7',
    value: 'rushi7',
  },
  {
    id: 10,
    label: 'rushi8',
    value: 'rushi8',
  },
  {
    id: 11,
    label: 'rushi9',
    value: 'rushi9',
  },
  {
    id: 12,
    label: 'rushi10',
    value: 'rushi10',
  },
  {
    id: 13,
    label: 'rushi11',
    value: 'rushi11',
  },
  {
    id: 14,
    label: 'rushi12',
    value: 'rushi12',
  },
  {
    id: 15,
    label: 'rushi13',
    value: 'rushi13',
  },
  {
    id: 16,
    label: 'rushi14',
    value: 'rushi14',
  },
  {
    id: 17,
    label: 'rushi15',
    value: 'rushi15',
  },
  {
    id: 18,
    label: 'rushi16',
    value: 'rushi16',
  },
  {
    id: 19,
    label: 'rushi17',
    value: 'rushi17',
  },
  {
    id: 20,
    label: 'rushi18',
    value: 'rushi18',
  },
];

interface fieldDataType {
  title: string;
  deletedAt: boolean;
  color: string;
}

function FormFieldModal({ handleClose, open }: any) {
  const dispatch = useDispatch();

  const { title, allowedUsers, deletedAt, color, id } = useSelector(selectFormBuilder);
  const { editableUsers, viewableUsers } = useSeparateFormUsers(allowedUsers);

  const [fieldData, setFieldData] = useState<fieldDataType>({
    title: '',
    deletedAt: false,
    color: '',
  });
  const [users, setUsers] = React.useState<UsersType>({
    editableUsers: [],
    viewableUsers: [],
  });

  useEffect(() => {
    if (open) {
      setFieldData((data: fieldDataType) => ({
        ...data,
        title: title,
        deletedAt: deletedAt,
        color: color,
      }));
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setUsers((data: UsersType) => ({
        ...data,
        editableUsers,
        viewableUsers,
      }));
    }
  }, [editableUsers, viewableUsers]);

  const handleChange = (key: string, value: string | boolean) => {
    setFieldData((data) => ({
      ...data,
      [key]: value,
    }));
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const editors = users.editableUsers.map((user: any) => {
      return {
        ...user,
        accessType: AccessType.Edit,
        accessOf: AccessOf.Form,
        userId: user.id,
        accessId: id,
      };
    });

    const viewers = users.viewableUsers.map((user: any) => {
      return {
        ...user,
        accessType: AccessType.View,
        accessOf: AccessOf.Form,
        userId: user.id,
        accessId: id,
      };
    });
    dispatch(
      setFormDetails({
        ...fieldData,
        allowedUsers: [...editors, ...viewers],
      }),
    );
    handleClose();
  };

  const handlerUserAccess = (key: string, value: Array<any>) => {
    setUsers((data: UsersType) => ({
      ...data,
      [key]: value,
    }));
  };

  return (
    <Modal
      title="modal"
      open={open}
      onCancel={handleClose}
      footer={null}
      maskClosable={false}
      getContainer={false}
      centered
      width={700}
    >
      <form onSubmit={submitHandler}>
        <div className="w-full space-y-0.5 mb-3">
          <label htmlFor="basic" className="text-xs font-medium text-gray-500">
            {' '}
            Your Name{' '}
          </label>

          <Input
            id="basic"
            placeholder="Basic usage"
            size="large"
            onChange={(e) => handleChange('title', e.target.value)}
            value={fieldData.title}
            className="border-gray-400 rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <label htmlFor="basic" className="text-xs font-medium text-gray-500">
            {' '}
            Editable Users{' '}
          </label>

          <Select
            mode="multiple"
            className="border-gray-400 rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
            style={{ width: '100%' }}
            size="large"
            placeholder="Please select"
            value={users.editableUsers}
            onChange={(values, items) =>
              handlerUserAccess('editableUsers', items as Array<any>)
            }
            options={options}
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <label htmlFor="basic" className="text-xs font-medium text-gray-500">
            {' '}
            Viewable Users{' '}
          </label>

          <Select
            mode="multiple"
            className="border-gray-400 rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
            style={{ width: '100%' }}
            size="large"
            placeholder="Please select"
            value={users.viewableUsers}
            onChange={(values, items) =>
              handlerUserAccess('viewableUsers', items as Array<any>)
            }
            options={options}
          />
        </div>

        <div className="w-full space-y-0.5 mb-3">
          <label htmlFor="basic" className="text-xs font-medium text-gray-500">
            {' '}
            Color Theme
          </label>

          <Input
            id="basic"
            placeholder="Basic usage"
            size="large"
            value={fieldData.color}
            onChange={(e) => handleChange('color', e.target.value)}
            disabled
            className="border-gray-400 rounded-md outline-none focus:border-gray-600 focus:ring-0 focus:outline-none"
          />
        </div>

        <div className="w-full space-y-0.5">
          <Switch
            checked={fieldData.deletedAt}
            onChange={(checked) => handleChange('deletedAt', checked)}
          />

          <label htmlFor="basic" className="text-md ml-2 font-medium text-gray-500">
            {' '}
            Deactivate
          </label>
        </div>

        <div className="mt-4 w-full justify-end flex gap-2">
          <ContainedButton type="submit">Save</ContainedButton>

          <OutlineButton
            type="button"
            onClickHandler={() => {
              {
                handleClose();
              }
            }}
          >
            Cancel
          </OutlineButton>
        </div>
      </form>
    </Modal>
  );
}

export default FormFieldModal;
