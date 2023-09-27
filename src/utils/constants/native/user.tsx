import { BsFillCollectionFill, BsFillSuitHeartFill } from "react-icons/bs";

export const userCardList = {
  user: [{ name: 'My Profile', slug: '/dashboard/profile' }],
  pages: [
    {
      name: 'rocky.phorfolio.site',
      slug: 'https://rocky.phorfolio.site',
      icon: <BsFillSuitHeartFill />,
    },
    { name: 'Dashboard', slug: '/dashboard', icon: <BsFillCollectionFill /> },
  ],
  singOut: [{ name: 'Sign out', slug: '' }],
};