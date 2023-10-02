import {
  BiSolidComponent,
  BiSolidDashboard,
  BiSolidUser,
} from 'react-icons/bi';
import { SiPowerpages } from 'react-icons/si';
import { proxy } from 'valtio';

export const SidebarState = proxy({
  collapsed: true, // Indicates if the navbar is opened or closed
});

export const SidebarList = [
  { name: 'Dashboard', slug: '/dashboard', icon: <BiSolidDashboard /> },
  { name: 'Blog', slug: '/dashboard/blog', icon: <BiSolidComponent /> },
  { name: 'Stories', slug: '/dashboard/stories', icon: <SiPowerpages /> },
  { name: 'Profile', slug: '/dashboard/profile', icon: <BiSolidUser /> },
];

export const accordionSideList = [
  // {
  //   name: 'Dashboard',
  //   slug: '/dashboard',
  //   list: [],
  //   icon: <BiSolidDashboard />,
  // },
  {
    name: 'Articles',
    slug: '/dashboard/articles',
    list: [],
    icon: <BiSolidComponent />,
  },
  {
    name: 'Projects',
    slug: '/dashboard/projects',
    list: [],
    icon: <SiPowerpages />,
  },
  // {
  //   name: 'Messages',
  //   slug: '/dashboard/message',
  //   list: [],
  //   icon: <BiSolidUser />,
  // },
  {
    name: 'Pages & Components',
    slug: '',
    list: [
      // {
      //   name: 'Contact',
      //   slug: '/dashboard/pages/contact',
      // },
      {
        name: 'About',
        slug: '/dashboard/pages/about',
      },
      {
        name: 'Resume',
        slug: '/dashboard/pages/resume',
      },
      {
        name: 'Components',
        slug: '/dashboard/pages/components',
      },
    ],
    icon: <BiSolidUser />,
  },
];
