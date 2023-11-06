import React from 'react';
import { useDrag } from 'react-dnd';

import { SIDEBAR_ITEM } from '../../data/constants';
import { SidebarItemType } from '../../utils/formbuilder/sidebarItem.type';

const SideBarItem = ({ data }: { data: SidebarItemType }) => {
  const [{ opacity }, drag] = useDrag({
    type: SIDEBAR_ITEM,
    item: data,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {data.fieldName}
    </div>
  );
};
export default SideBarItem;
