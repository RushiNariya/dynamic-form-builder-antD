/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { PlusIcon } from '@heroicons/react/20/solid';
import { Icon } from '@iconify/react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import Swal from 'sweetalert2';

import ContainedButton from '../../components/Buttons/ContainedButton';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';
import PageLayout from '../../components/PageLayout/PageLayout';
import Paginate from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import SelectSearch from '../../components/SelectSearch/SelectSearch';
import { selectAuthToken } from '../../redux/auth/selectors';
import { useSelector } from '../../redux/rootStateType';
import {
  addNewUserThunkAction,
  deleteUserThunkAction,
  fetchUsersThunkAction,
  updateUserThunkAction,
} from '../../redux/users/action';
import { selectUsersList } from '../../redux/users/selectors';
import UserType from '../../types/users.type';
import confirmationPopup from '../../utils/confirmationPopup';
import { getColumns } from './Columns';

const INITIAL_PAGE_INDEX = 0;
const INITIAL_PAGE_SIZE = 10;

const optionsData = [
  { name: 'staff', label: 'Staff' },
  { name: 'drafter', label: 'Drafter' },
  { name: 'rpls', label: 'Rpls' },
  { name: 'admin', label: 'Admin' },
  { name: 'fieldRep', label: 'Field Rep' },
];

function Users() {
  const dispatch = useDispatch<any>();
  const { users, isLoading, totalPage } = useSelector(selectUsersList);
  const token = useSelector(selectAuthToken) || localStorage.getItem('token');

  const [usersData, setUsersData] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number | undefined>();
  const [roleFilter, setRoleFilter] = useState<string | number>('');
  const [sort, setSort] = useState<{ sortBy: string; sortDirection: string }>({
    sortBy: '',
    sortDirection: '',
  });

  const columns: any = useMemo(
    () =>
      getColumns(
        index,
        deleteUserHandler,
        selectEditableUserHandler,
        updateUserStatusHandler,
      ),
    [index, usersData],
  );
  const data = useMemo(() => usersData, [usersData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: INITIAL_PAGE_INDEX,
        sortBy: [],
        pageSize: INITIAL_PAGE_SIZE,
      },
      manualPagination: true,
      manualSortBy: true,
      disableMultiSort: false,
      manualGlobalFilter: true,
      pageCount: Math.ceil(totalPage),
      autoResetSortBy: false,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    pageOptions,
    pageCount,
    gotoPage,
    state,
    setSortBy,
    setPageSize,
    setGlobalFilter,
  } = tableInstance;

  const { pageIndex, globalFilter, pageSize } = state;

  useEffect(() => {
    setUsersData(users);
  }, [users, users?.length]);

  useEffect(() => {
    const getIndex = () => {
      return Number(`${pageIndex * pageSize}`);
    };
    setIndex(getIndex);
  }, [pageIndex, pageSize]);

  const onSuccess = () => {
    setError(null);
  };

  const onError = (error: string) => {
    setError(error);
  };

  const onSubmitHandler = (globalFilter: string) => {
    setGlobalFilter(globalFilter);
  };

  function onRoleFilterHandler(filter: string | number) {
    if (pageIndex !== 0) {
      gotoPage(0);
    }
    setRoleFilter(filter);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const addNewUserHandler = (reqBody: any, editableUser: UserType | null | undefined) => {
    if (editableUser) {
      dispatch(
        updateUserThunkAction(editableUser.id, reqBody, () => {
          setUsersData((preData) =>
            preData.map((item) => {
              if (item?.id === editableUser.id) {
                return {
                  ...item,
                  ...reqBody,
                };
              }
              return item;
            }),
          );
        }),
      );
    } else {
      dispatch(
        addNewUserThunkAction(reqBody, () => {
          if (pageIndex === 0) {
            dispatch(
              fetchUsersThunkAction(
                {
                  limit: pageSize,
                  page: 0,
                  search: globalFilter || '',
                  sort: sort?.sortBy,
                  orderBy: sort?.sortDirection,
                  role: roleFilter,
                },
                onSuccess,
                onError,
              ),
            );
          } else {
            gotoPage(0);
          }
        }),
      );
    }
  };

  function updateUserStatusHandler(userId: number): void {
    const selectedUser = usersData.find((user) => user?.id === userId);

    if (selectedUser) {
      dispatch(
        updateUserThunkAction(
          userId,
          { ...selectedUser, status: !selectedUser?.status },
          () => {
            setUsersData((preData) =>
              preData.map((item) => {
                if (item?.id === userId) {
                  return {
                    ...item,
                    status: !item.status,
                  };
                }
                return item;
              }),
            );
          },
        ),
      );
    }
  }

  function selectEditableUserHandler(id: number) {
    const userSelected = usersData.find((item) => item?.id === id);
    setSelectedUser(userSelected);
    handleClickOpen();
  }

  function callUsersThunkHandler() {
    dispatch(
      fetchUsersThunkAction(
        {
          limit: pageSize,
          page: pageIndex,
          search: globalFilter || '',
          sort: sort?.sortBy,
          orderBy: sort?.sortDirection,
          role: roleFilter,
        },
        onSuccess,
        onError,
      ),
    );
  }

  async function deleteUserHandler(userId: number) {
    try {
      const result = await confirmationPopup('user');

      if (result.isConfirmed) {
        dispatch(
          deleteUserThunkAction(userId, () => {
            if (usersData.length === 1 && pageIndex !== 0) {
              gotoPage(pageIndex - 1);
            } else {
              callUsersThunkHandler();
            }
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      callUsersThunkHandler();
    }
  }, [pageIndex, pageSize, globalFilter, sort, roleFilter, token]);

  return (
    <PageLayout pageTitle="Users">
      <div className="w-full flex justify-end border-none px-3">
        <ContainedButton type="button" onClickHandler={handleClickOpen}>
          <div className="flex">
            <PlusIcon className="h-5 w-5 mr-1 text-white inline" aria-hidden="true" />
            Add User
          </div>
        </ContainedButton>
      </div>
      <div className="w-full flex flex-wrap justify-end my-5 content-start px-3">
        <div className="flex gap-5">
          <Search onSubmitHandler={onSubmitHandler} />
          <SelectSearch
            placeHolder="Select Role"
            setRole={onRoleFilterHandler}
            role={roleFilter}
            options={optionsData}
          />
        </div>
      </div>

      {isLoading ? (
        <Fragment>
          <Loader />
        </Fragment>
      ) : (
        <Fragment>
          {error ? (
            <Fragment>
              <Error error={error} />
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex-auto px-0 pt-0">
                <div className="p-0 overflow-x-auto border-none">
                  <table
                    className="items-center w-full mb-0 align-top border-collapse border-none text-slate-500"
                    {...getTableProps()}
                  >
                    <thead className="align-bottom">
                      {headerGroups.map((headerGroup, index) => (
                        <tr
                          className="bg-slate-100 h-[55px]"
                          {...headerGroup.getHeaderGroupProps()}
                          key={headerGroup.id + index}
                        >
                          {headerGroup.headers.map((column) => (
                            <th
                              className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent shadow-none text-xxs tracking-none whitespace-nowrap text-slate-950 opacity-70"
                              // @ts-ignore
                              key={column.id}
                              onClick={() => {
                                if (!column.disableSortBy) {
                                  const desc =
                                    column.isSortedDesc === true
                                      ? undefined
                                      : column.isSortedDesc === false
                                      ? true
                                      : false;
                                  setSort({
                                    sortBy: column.id,
                                    sortDirection: desc ? 'desc' : 'asc',
                                  });
                                  setSortBy([{ id: column.id, desc }]);
                                }
                              }}
                              {...column.getHeaderProps()}
                            >
                              {column.render('Header')}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <Icon
                                      icon="mdi:arrow-down"
                                      width="20"
                                      height="20"
                                      className="inline ml-2"
                                    />
                                  ) : (
                                    <Icon
                                      icon="mdi:arrow-up"
                                      width="20"
                                      height="20"
                                      className="inline ml-2"
                                    />
                                  )
                                ) : !column.disableSortBy ? (
                                  <Icon
                                    icon="mdi:chevron-up-down"
                                    width="20"
                                    height="20"
                                    className="inline ml-2"
                                  />
                                ) : null}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr
                            className="h-[55px] border-b border-gray-100"
                            {...row.getRowProps()}
                            key={row.id}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent"
                                  // @ts-ignore
                                  key={cell.id}
                                  {...cell.getCellProps()}
                                >
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {usersData.length === 0 ? null : (
                  <div className="flex justify-end mr-4 my-4">
                    <Paginate
                      pageIndex={pageIndex}
                      pageCount={pageCount}
                      previousPage={previousPage}
                      nextPage={nextPage}
                      gotoPage={gotoPage}
                    />
                  </div>
                )}
              </div>
              {!error && usersData?.length === 0 && (
                <div className="min-h-[30vh] flex justify-center items-center text-xl">
                  No users data found.
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </PageLayout>
  );
}

export default Users;
