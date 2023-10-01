import React from 'react';
import Link from 'next/link';
import { User } from '@/interface';
import UserProfile from './profile';
import { GiLaptop } from 'react-icons/gi';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiSettings2Fill } from 'react-icons/ri';
import { signOut, useSession } from 'next-auth/react';
import { userCardList } from '@/utils/constants/native/user';

const UserMenu = () => {
  const userDropdownRef = React.useRef<HTMLDivElement | null>(null);
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);

  const { data: session, status } = useSession();
  const user = { ...session?.user } as User;

  const toggleUserDropdown = () =>{console.log('Toggling user dropdown'); setShowUserDropdown((preState)=>!preState);}
  const handleSignOut = () => signOut();

  React.useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (showUserDropdown && userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showUserDropdown]);

  return (
    status === 'authenticated' && (
      <div ref={userDropdownRef} className='text-gray-300'>
        <button
          onClick={toggleUserDropdown}
          type='button'
          className='flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300'>
          <span className='sr-only'>Open user menu</span>
          <UserProfile user={user} />
        </button>
        {showUserDropdown && (
          <div className='border-[1px] border-rose-700 border-opacity-50 absolute top-12 right-0 mt-3 mr-2 w-56 z-50 text-base list-none bg-[#131b24] rounded divide-y divide-rose-700 divide-opacity-50 shadow'>
            <div className='py-3 px-4'>
              <span className='block text-sm font-semibold'>{user.name}</span>
              <span className='block text-sm font-light truncate '>
                {user?.email}
              </span>
            </div>
            <ul className='py-1 font-light '>
              {userCardList.user.map((list, index) => (
                <li key={index}>
                  <Link
                    href={list.slug}
                    className='inline-flex gap-2 items-center py-2 px-4 text-sm'
                  >
                    <GiLaptop /> {list.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className='py-1 font-light '>
              {userCardList.pages.map((list, index) => (
                <li key={index}>
                  {list.slug.includes('phorfolio') ? (
                    <Link
                      href={`https://${user.username}.${list.slug}`}
                      className='inline-flex gap-2 items-center py-2 px-4 text-sm'
                    >
                      {list.icon}
                      {`${user.username}.${list.name}`}
                    </Link>
                  ) : (
                    <Link
                      href={list.slug}
                      className='inline-flex gap-2 items-center py-2 px-4 text-sm'
                    >
                      {list.icon}
                      {list.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ul className='py-1 font-light '>
              <li>
                <Link
                  href={`/dashboard/settings`}
                  className='inline-flex gap-2 items-center py-2 px-4 text-sm'
                >
                  <RiSettings2Fill /> Settings
                </Link>
              </li>
              <li className='cursor-pointer' onClick={handleSignOut}>
                <span className='inline-flex gap-2 items-center py-2 px-4 text-sm'>
                  <FaSignOutAlt /> Sign out
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default UserMenu;
