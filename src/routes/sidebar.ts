import { routeType, routeTypeChildren } from './routes.type';

const adminSidebarRoutes: (routeType | routeTypeChildren)[] = [
  {
    title: 'Dashboard',
    icon: 'radix-icons:dashboard',
    manualIcon: false,
    path: '/admin/dashboard',
  },
  {
    title: 'Users',
    icon: `mdi:account-group-outline`,
    manualIcon: false,
    path: '/admin/Users',
  },
  {
    title: 'Clients',
    icon: 'teenyicons:users-outline',
    manualIcon: false,
    path: '/admin/clients',
  },
  {
    title: 'Orders',
    icon: 'mdi:order-bool-ascending-variant',
    manualIcon: false,
    path: '/admin/orders',
  },
  {
    title: 'Documents',
    icon: 'teenyicons:documents-outline',
    manualIcon: false,
    path: '/admin/documents',
  },
];

export default adminSidebarRoutes;
