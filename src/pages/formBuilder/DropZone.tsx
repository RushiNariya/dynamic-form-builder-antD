import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

import { ROW, SIDEBAR_ITEM } from '../../data/constants';
import { DropZoneItemType, DropZoneType } from '../../utils/formbuilder/dropzone.type';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';

const ACCEPTS = [SIDEBAR_ITEM, ROW];

interface DropZonePropsType {
  data: DropZoneType;
  onDrop: (dropZone: DropZoneType, item: SidebarItemType & DropZoneItemType) => void;
  isLast?: boolean;
  isFirst?: boolean;
  className?: any;
}

const DropZone = ({ data, onDrop, isLast, isFirst, className }: DropZonePropsType) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor: any) => {
      onDrop(data, item);
    },
    canDrop: (item: any, monitor: any) => {
      const dropZonePath = data.path;
      const splitDropZonePath = dropZonePath.split('-');
      const itemPath = item.path;

      // sidebar items can always be dropped anywhere
      if (!itemPath) {
        return true;
      }

      const splitItemPath = itemPath.split('-');

      // Invalid (Can't drop a parent element (row) into a child (column))
      const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
      if (parentDropInChild) return false;

      // Current item can't possible move to it's own location
      if (itemPath === dropZonePath) return false;

      // Current area
      if (splitItemPath.length === splitDropZonePath.length) {
        const pathToItem = splitItemPath.slice(0, -1).join('-');
        const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

        const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');
        const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1;
          if (nextDropZoneIndex === currentDropZoneIndex) return true;
        }
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  return (
    <div
      className={classNames('dropZone', { active: isActive, isLast, isFirst }, className)}
      ref={drop}
    />
  );
};
export default DropZone;
