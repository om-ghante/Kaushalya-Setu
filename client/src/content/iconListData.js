import { 
  BsSpeedometer2, 
  BsGraphUp, 
  BsClipboardData, 
  BsGear,
  BsPeople,
  BsBox,
  BsCreditCard,
  BsBell
} from 'react-icons/bs';

const iconListData = [
  {
    id: 1,
    label: 'Dashboard',
    icon: BsSpeedometer2,
    color: 'black',
    path: '/dashboard'
  },
  {
    id: 2,
    label: 'Analytics',
    icon: BsGraphUp,
    color: 'black',
    path: '/analytics'
  },
  {
    id: 3,
    label: 'Reports',
    icon: BsClipboardData,
    color: 'black',
    path: '/reports'
  },
  {
    id: 4,
    label: 'Settings',
    icon: BsGear,
    color: 'black',
    path: '/settings'
  },
  {
    id: 5,
    label: 'Users',
    icon: BsPeople,
    color: 'black',
    path: '/users'
  },
  {
    id: 6,
    label: 'Products',
    icon: BsBox,
    color: 'black',
    path: '/products'
  },
  {
    id: 7,
    label: 'Billing',
    icon: BsCreditCard,
    color: 'black',
    path: '/billing'
  },
  {
    id: 8,
    label: 'Notifications',
    icon: BsBell,
    color: 'black',
    path: '/notifications'
  }
];

export default iconListData;