import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export const getColumns = (
  index: number | undefined,
  deleteUserHandler: (userId: number) => void,
  selectEditableUserHandler: (userId: number) => void,
  updateUserStatusHandler: (userId: number) => void,
) => {
  return [
    {
      Header: 'Id',
      accessor: 'id',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <div className="flex px-2 py-1">
            <div className="flex flex-col justify-center">
              <p className="mb-0 text-md leading-tight text-slate-800">
                {index + row.index + 1}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Full Name',
      accessor: 'fullName',
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <div className="flex px-2 py-1">
            <div className="flex flex-col justify-center">
              <p className="mb-0 text-md leading-tight text-slate-800">
                {row.original.fullName}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <div className="flex px-2 py-1">
            <div className="flex flex-col justify-center">
              <p className="mb-0 text-md leading-tight text-slate-800">
                {row.original.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      Header: 'Role',
      accessor: 'role',
      disableFilters: true,
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <p className="mb-0 text-md leading-tight text-slate-800 capitalize">
            {row.original.role}
          </p>
        );
      },
    },
    {
      Header: 'Status',
      accessor: 'status',
      disableFilters: true,
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <p className="mb-0 text-md leading-tight text-slate-800">
            {row.original.status ? (
              <span
                onClick={() => {
                  updateUserStatusHandler(row?.original?.id);
                }}
                className="bg-gradient-to-tl cursor-pointer from-emerald-500 to-teal-400 px-2 text-xs rounded-md py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"
              >
                Active
              </span>
            ) : (
              <span
                onClick={() => {
                  updateUserStatusHandler(row?.original?.id);
                }}
                className="bg-gradient-to-tl cursor-pointer from-slate-600 to-slate-300 px-2 text-xs rounded-md py-2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white"
              >
                Inactive
              </span>
            )}
          </p>
        );
      },
    },
    {
      Header: 'Edit',
      disableSortBy: true,
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => selectEditableUserHandler(row.original.id)}
          >
            <EditIcon color="primary" />
          </IconButton>
        );
      },
    },
    {
      Header: 'Delete',
      disableSortBy: true,
      Cell: ({ row }: any): JSX.Element | string => {
        return (
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => deleteUserHandler(row.original.id)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        );
      },
    },
  ];
};
