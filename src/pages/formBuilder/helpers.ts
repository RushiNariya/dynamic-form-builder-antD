import { v4 as uuidv4 } from 'uuid';

import { ROW } from '../../data/constants';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';

// a little function to help us with reordering the result
export const reorder = (
  list: SidebarItemType[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

export const insert = (
  arr: SidebarItemType[],
  index: number,
  newItem: SidebarItemType,
) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const reorderChildren = (
  children: SidebarItemType[],
  splitDropZonePath: string[],
  splitItemPath: '' | string[],
) => {
  const dropZoneIndex = Number(splitDropZonePath[0]);
  const itemIndex = Number(splitItemPath[0]);
  return reorder(children, itemIndex, dropZoneIndex);
};

export const addChildToChildren = (
  children: SidebarItemType[],
  splitDropZonePath: string[],
  item: SidebarItemType,
) => {
  const dropZoneIndex = Number(splitDropZonePath[0]);
  return insert(children, dropZoneIndex, item);
};

export const handleMoveWithinParent = (
  fields: SidebarItemType[],
  splitDropZonePath: string[],
  splitItemPath: string[],
) => {
  return reorderChildren(fields, splitDropZonePath, splitItemPath);
};

export const handleMoveSidebarComponentIntoParent = (
  fields: SidebarItemType[],
  splitDropZonePath: string[],
  item: SidebarItemType,
) => {
  let newLayoutStructure: SidebarItemType;
  switch (splitDropZonePath.length) {
    case 1: {
      newLayoutStructure = {
        ...item,
        type: ROW,
        id: uuidv4(),
      };
      break;
    }

    default: {
      newLayoutStructure = item;
    }
  }

  return addChildToChildren(fields, splitDropZonePath, newLayoutStructure);
};
