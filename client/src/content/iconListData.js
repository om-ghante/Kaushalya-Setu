import {
  BsHouseDoor,
  BsPerson,
  BsHeart,
  BsCalendar,
  BsChatDots,
  BsCompass
} from 'react-icons/bs'; 

const iconListData = [
  {
    id: 1,
    label: 'Home',
    icon: BsHouseDoor,
    color: 'black',
    path: '/home'
  },
  {
    id: 6,
    label: 'Explore Skills',
    icon: BsCompass,
    color: 'black',
    path: '/explore'
  },
  {
    id: 2,
    label: 'Profile',
    icon: BsPerson,
    color: 'black',
    path: '/profile'
  },
  {
    id: 3,
    label: 'My Match',
    icon: BsHeart,
    color: 'black',
    path: '/match'
  },
  {
    id: 4,
    label: 'Calendar',
    icon: BsCalendar,
    color: 'black',
    path: '/calendar'
  },
  {
    id: 5,
    label: 'Inbox',
    icon: BsChatDots,
    color: 'black',
    path: '/message'
  }
];

export default iconListData;
