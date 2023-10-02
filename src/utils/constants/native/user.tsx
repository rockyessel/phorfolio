import { BsFillCollectionFill, BsFillSuitHeartFill } from "react-icons/bs";
import { MdOutlineSportsBasketball } from "react-icons/md";

export const userCardList = {
  user: [{ name: 'My Profile', slug: '/dashboard/profile' }],
  pages: [
    {
      name: `${process.env.NODE_ENV === 'production' ? 'phorfolio.site' : 'localhost:3000'}`,
      slug: `${process.env.NODE_ENV === 'production' ? 'phorfolio.site' : 'localhost:3000'}`,
      icon: <MdOutlineSportsBasketball />,
    },
    { name: 'Dashboard', slug: `${process.env.NODE_ENV === 'production' ? 'https://phorfolio/dashboard/articles' : ''}`, icon: <BsFillCollectionFill /> },
  ],
  singOut: [
    { name: 'Sign out', slug: '' },
    { name: 'Settings', slug: '/dashboard/settings' },
  ],
};


