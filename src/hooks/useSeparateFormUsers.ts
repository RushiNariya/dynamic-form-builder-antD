import React from 'react';

import { AccessType } from '../data/constants';
import { UsersType } from '../utils/formbuilder/sidebarItem.type';

const useSeparateFormUsers = (allowedUsers: Array<any>) => {
  const [users, setUsers] = React.useState<UsersType>({
    editableUsers: [],
    viewableUsers: [],
  });

  React.useEffect(() => {
    const editableUsers = allowedUsers.filter(
      (user: any) => user.accessType === AccessType.Edit,
    );
    const viewableUsers = allowedUsers.filter(
      (user: any) => user.accessType === AccessType.View,
    );
    setUsers({
      editableUsers,
      viewableUsers,
    });
  }, [allowedUsers]);

  return { ...users };
};

export default useSeparateFormUsers;
