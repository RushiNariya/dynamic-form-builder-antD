/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from '@iconify/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import toggleContext, { contextType } from '../../context';
import useViewport from '../../hooks/useViewport';
import { routeType, routeTypeChildren } from '../../routes/routes.type';

const SidebarItems = ({ item }: { item: routeType | routeTypeChildren }) => {
  const [open, setOpen] = React.useState(false);
  const { isOpen, setIsOpen } = React.useContext<contextType>(toggleContext);
  const { width } = useViewport();

  if ('children' in item) {
    return (
      <div className={open ? 'open' : 'sidebar-item'}>
        <div className="sidebar-title" onClick={() => setOpen(!open)}>
          <span>
            {item.manualIcon ? (
              <img src={item.icon} className="mr-2 mb-1 inline-block" alt="images" />
            ) : (
              <Icon icon={item.icon} className="mr-2 mb-1 inline-block" />
            )}
            <span className={isOpen ? '' : 'hidden'}>{item.title}</span>
          </span>
          {open ? (
            <Icon icon="material-symbols:keyboard-arrow-down" width="20" height="20" />
          ) : (
            <Icon icon="material-symbols:keyboard-arrow-right" width="20" height="20" />
          )}
        </div>
        <div className="sidebar-content">
          {item.children.map((item, index) => (
            <NavLink
              key={index}
              to={item.path || '/'}
              className={(navData) =>
                navData.isActive ? 'sidebar-item plain childactive' : 'sidebar-item plain'
              }
            >
              {item.manualIcon ? (
                <img src={item.icon} className="mr-2 mb-1 inline-block" alt="images" />
              ) : (
                <Icon icon={item.icon} className="mr-2 mb-1 inline-block" />
              )}
              <span className={isOpen ? '' : 'hidden'}>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink
        to={item.path || '/'}
        className={(navData) =>
          navData.isActive
            ? 'sidebar-item plain active align-center mb-4'
            : 'sidebar-item plain mb-4'
        }
        onClick={() => {
          width < 785 ? setIsOpen(false) : {};
        }}
      >
        {item.manualIcon ? (
          <img src={item.icon} className="mr-2 inline-block" alt="images" />
        ) : (
          <Icon icon={item.icon} className="mr-2 inline-block" />
        )}
        <span className={isOpen ? '' : 'hidden'}>{item.title}</span>
      </NavLink>
    );
  }
};

export default SidebarItems;
