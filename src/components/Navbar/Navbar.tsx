/* eslint-disable jsx-a11y/anchor-is-valid */
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import toggleContext, { contextType } from '../../context';
import { loggingOutUserThunkAction } from '../../redux/auth/action';
import { selectAuth } from '../../redux/auth/selectors';
import { useSelector } from '../../redux/rootStateType';
import { UserRoles } from '../../utils/role';
import BackButton from '../Buttons/BackButton';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const { isOpen, setIsOpen } = React.useContext<contextType>(toggleContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname } = useLocation();

  const { loggedInUser } =
    useSelector(selectAuth) || (localStorage.getItem('user') as UserRoles);

  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const navigateTo = useNavigate();

  //need to update according to new route names
  const isUpdatePage = pathname.includes('update');
  const isAddPage = pathname.includes('add');
  const isDetailsPage = pathname.includes('details');
  const isBuilderPage = pathname.includes('builder');

  const isBackVisible = isUpdatePage || isAddPage || isDetailsPage || isBuilderPage;

  const navigateToLoginPage = () => {
    navigateTo('/auth/login', { replace: true });
  };

  const signOut = (): void => {
    dispatch(loggingOutUserThunkAction(navigateToLoginPage));
  };

  return (
    <Disclosure as="nav" className="bg-slate-50">
      {() => (
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-1 h-16 items-center justify-between">
            <div className="inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button
                className="inline-flex items-center border-none justify-center rounded-md p-2 text-gray-400"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>

                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </Disclosure.Button>

              {isBackVisible ? (
                <div>
                  <BackButton onClick={() => navigateTo(-1)} />
                </div>
              ) : null}
            </div>

            {isBackVisible ? (
              <div className="hidden md:block">
                <BackButton onClick={() => navigateTo(-1)} />
              </div>
            ) : (
              <div className="hidden md:block"></div>
            )}

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <div className="font-medium text-sm">{loggedInUser?.fullName}</div>
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full text-sm border-none cursor-pointer">
                    <span className="sr-only">Open user menu</span>
                    <div className="relative flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-xl bg-gray-200 text-sm font-bold uppercase text-gray-800">
                      {loggedInUser?.fullName ? loggedInUser?.fullName[0] : ''}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring ring-white"
                      ></span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <div
                        className={classNames(
                          'px-4 py-2 text-sm font-semibold text-gray-700 flex justify-between',
                        )}
                      >
                        {loggedInUser?.email}

                        <Icon
                          icon="mingcute:user-4-line"
                          width="23"
                          height="23"
                          className="text-[#0063a0] font-bold"
                        />
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="change-password"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 no-underline',
                          )}
                        >
                          Change Password
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/admin/form-builder"
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700 no-underline',
                          )}
                        >
                          Form Builder
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Box
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          )}
                          onClick={() => {
                            signOut();
                          }}
                        >
                          Sign out
                        </Box>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
