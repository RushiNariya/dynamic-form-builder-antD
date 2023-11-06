import { Icon } from '@iconify/react';
import { message, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import Drawer from '../../components/Modal/FieldDrawer';
import { ROW } from '../../data/constants';
import { openModal } from '../../redux/common/action';
import {
  deleteFormComponent,
  selectedFormComponent,
} from '../../redux/formBuider/action';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';

interface RowPropsType {
  data: SidebarItemType;
  path: string;
}

const style = {};
const Row = ({ data, path }: RowPropsType) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: ROW,
    item: {
      id: data.id,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const handleClickOpen = () => {
    dispatch(openModal());
  };

  const editHandler = (row: SidebarItemType) => {
    dispatch(selectedFormComponent(row));
    handleClickOpen();
  };

  const deleteHandler = (row: SidebarItemType) => {
    dispatch(deleteFormComponent(row.id));
  };

  const confirm = () => {
    deleteHandler(data);
  };

  const cancel = () => {};

  return (
    <>
      <div
        ref={ref}
        style={{ ...style, opacity }}
        className="base draggable row row_style"
      >
        <div>
          {data.title} - {data.details.placeHolder} - {data.details?.defaultValue}
        </div>
        <div>
          <Icon
            icon="uil:edit"
            className="icon"
            width={25}
            height={25}
            onClick={() => editHandler(data)}
          />

          <Popconfirm
            title={'Single Line'}
            description="Are you sure to delete this field?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Icon
              icon="carbon:delete"
              className="icon"
              width={25}
              height={25}
              // onClick={() => deleteHandler(data)}
            />
          </Popconfirm>
        </div>
      </div>

      <Drawer />
    </>
  );
};
export default Row;
