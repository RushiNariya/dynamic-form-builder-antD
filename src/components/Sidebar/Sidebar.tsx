/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Sidebar.css';

import { Icon } from '@iconify/react';
import React from 'react';

// need to add new logo as per new project
import logo from '../../assets/images/auth_banner.jpg';
import toggleContext, { contextType } from '../../context';
import useViewport from '../../hooks/useViewport';
import { routeType, routeTypeChildren } from '../../routes/routes.type';
import SidebarItems from './SidebarItems';

const Sidebar = (props: { routes: (routeType | routeTypeChildren)[] }) => {
  const { routes } = props;
  const { width } = useViewport();
  const { isOpen, setIsOpen } = React.useContext<contextType>(toggleContext);
  return (
    <React.Fragment>
      {width > 785 && (
        <div className={isOpen ? 'sidebar' : 'sidebarclose'}>
          <div>
            <div className="flex w-full justify-end">
              {isOpen ? (
                <Icon
                  icon="heroicons-solid:chevron-double-left"
                  color="#b4b7bd"
                  width="32"
                  height="32"
                  className="mx-4 my-1 px-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsOpen(!isOpen)}
                />
              ) : (
                <Icon
                  icon="heroicons-solid:chevron-double-right"
                  color="#b4b7bd"
                  width="32"
                  height="32"
                  className="mx-4 my-1 px-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsOpen(!isOpen)}
                />
              )}
            </div>
            <div className="flex justify-center items-center mb-4 items-baseline">
              <span className={isOpen ? '' : 'hidden'}>
                <img alt=".." src={logo} width="160" />
              </span>
            </div>
          </div>

          {routes?.map((item, index) => (
            <SidebarItems key={index} item={item} />
          ))}
        </div>
      )}
      {width < 785 && (
        <div className={isOpen ? 'sidebar' : 'sidebarclose-active'}>
          <div>
            <div className="flex w-full justify-end">
              {isOpen ? (
                <Icon
                  icon="line-md:chevron-small-double-left"
                  color="#b4b7bd"
                  width="32"
                  height="32"
                  className="m-3 px-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsOpen(!isOpen)}
                />
              ) : null}
            </div>
            <div className="flex justify-center items-center items-baseline">
              <span className={isOpen ? '' : 'hidden'}>
                <img alt=".." src={logo} width="160" />
              </span>
            </div>
          </div>

          {routes?.map((item, index) => (
            <SidebarItems key={index} item={item} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Sidebar;
