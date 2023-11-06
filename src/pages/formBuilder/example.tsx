import { Icon } from '@iconify/react';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ContainedButton from '../../components/Buttons/ContainedButton';
import { SIDEBAR_ITEM } from '../../data/constants';
import { SIDEBAR_ITEMS } from '../../data/formSidebarData';
import { setFormComponents, setFormTitle } from '../../redux/formBuider/action';
import { selectFormFields, selectFormTitle } from '../../redux/formBuider/selectors';
import { useDispatch, useSelector } from '../../redux/rootStateType';
import { DropZoneItemType, DropZoneType } from '../../utils/formbuilder/dropzone.type';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';
import DropZone from './DropZone';
import FormFieldModal from './FormFieldModal';
import { handleMoveSidebarComponentIntoParent, handleMoveWithinParent } from './helpers';
import Row from './Row';
import SideBarItem from './SideBarItem';

const Example = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const fields = useSelector(selectFormFields);
  const formTitle = useSelector(selectFormTitle);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrop = useCallback(
    (dropZone: DropZoneType, item: SidebarItemType & DropZoneItemType) => {
      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page

        const newComponent: SidebarItemType = {
          ...item,
          id: uuidv4(),
        };
        dispatch(
          setFormComponents(
            handleMoveSidebarComponentIntoParent(fields, splitDropZonePath, newComponent),
          ),
        );
        return;
      }

      // move down here since sidebar items don't have path
      const splitItemPath = item?.path && item?.path.split('-');
      const pathToItem = splitItemPath && splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath?.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          dispatch(
            setFormComponents(
              handleMoveWithinParent(
                fields,
                splitDropZonePath,
                splitItemPath as string[],
              ),
            ),
          );
          return;
        }

        return;
      }
    },
    [fields],
  );

  const renderRow = (row: SidebarItemType, currentPath: string) => {
    return <Row key={row.id} data={row} path={currentPath} />;
  };

  // console.log(fields);

  return (
    <div className="body">
      <div className="sideBar_form">
        <h3 className="text-center font-medium py-2">Form Components</h3>
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            {/* <h2>Form Builder</h2> */}
            <input
              type="text"
              className="border-0 border-b-2 border-opacity-30 border-gray-300 h-[3rem] px-2 outline-none text-xl font-semibold placeholder:text-gray-300"
              placeholder="Form Title Here"
              value={formTitle}
              onChange={(e) => {
                dispatch(setFormTitle(e.target.value));
              }}
            />

            <Icon
              icon="uil:edit"
              className="icon opacity-70 ml-4 mt-4"
              width={25}
              height={25}
              onClick={() => handleClickOpen()}
            />
          </div>
          <div className="flex gap-2">
            {/* <ContainedButton>Export</ContainedButton> */}
            <ContainedButton>Preview</ContainedButton>
          </div>
        </div>
        <div className="page relative">
          {fields.map((row: SidebarItemType, index: number) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: fields.length,
                  }}
                  isFirst={index === 0}
                  onDrop={handleDrop}
                />
                {renderRow(row, currentPath)}
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: fields.length,
                  }}
                  onDrop={handleDrop}
                />

                <hr className="border-gray-100 opacity-30" />
              </React.Fragment>
            );
          })}
          {fields.length ? null : (
            <div className="flex text-lg font-semibold opacity-30 absolute -z-30 top-0 left-0 w-[100%] h-[100%] justify-center items-center">
              Drag and Drop here{' '}
            </div>
          )}
          <DropZone
            data={{
              path: `${fields.length}`,
              childrenCount: fields.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>

      {open ? <FormFieldModal handleClose={handleClose} open={open} /> : null}
    </div>
  );
};
export default Example;
