export enum UserRoles {
  SUPER_ADMIN = 'super_admin',
  SUB_ADMIN = 'sub_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export const getUserRole = (role: UserRoles) => {
  switch (role) {
    case UserRoles.ADMIN:
      return UserRoles.ADMIN;
    case UserRoles.SUPER_ADMIN:
      return UserRoles.SUPER_ADMIN;
    case UserRoles.SUB_ADMIN:
      return UserRoles.SUB_ADMIN;
    case UserRoles.EDITOR:
      return UserRoles.EDITOR;
    case UserRoles.VIEWER:
      return UserRoles.VIEWER;
    default:
      return UserRoles.ADMIN;
  }
};

export const defaultHomePage = (role: UserRoles) => {
  switch (role) {
    case UserRoles.ADMIN:
      return '/admin';
    case UserRoles.SUPER_ADMIN:
      return '/super-admin';
    case UserRoles.SUB_ADMIN:
      return '/sub-admin';
    case UserRoles.EDITOR:
      return '/editor';
    case UserRoles.VIEWER:
      return '/viewer';
    default:
      return '/admin';
  }
};

export const defaultUnauthorizedPage = (role: UserRoles) => {
  switch (role) {
    case UserRoles.ADMIN:
      return '/admin/unauthorized';
    case UserRoles.SUPER_ADMIN:
      return '/super-admin/unauthorized';
    case UserRoles.SUB_ADMIN:
      return '/sub-admin/unauthorized';
    case UserRoles.EDITOR:
      return '/editor/unauthorized';
    case UserRoles.VIEWER:
      return '/viewer/unauthorized';
    default:
      return '/admin/unauthorized';
  }
};

export const defaultNotFoundPage = (role: UserRoles) => {
  switch (role) {
    case UserRoles.ADMIN:
      return '/admin/notfound';
    case UserRoles.SUPER_ADMIN:
      return '/super-admin/notfound';
    case UserRoles.SUB_ADMIN:
      return '/sub-admin/notfound';
    case UserRoles.EDITOR:
      return '/editor/notfound';
    case UserRoles.VIEWER:
      return '/viewer/notfound';
    default:
      return '/admin/notfound';
  }
};
