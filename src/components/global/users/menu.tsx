import React, { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { User } from '@/interface';
import UserProfile from './profile';
import { userCardList } from '@/utils/constants/native/user';

const UserMenu = () => {
  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { data: session } = useSession();

  const user = { ...session?.user } as User;

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        showUserDropdown &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showUserDropdown]);

  return (
    <div>
      <button
        onClick={toggleUserDropdown}
        type='button'
        className='flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 '
      >
        <span className='sr-only'>Open user menu</span>
        <UserProfile user={user} />
      </button>
      {showUserDropdown && (
        <div
          ref={userDropdownRef}
          className='absolute top-12 right-0 mt-3 mr-2 w-56 z-50 text-base list-none bg-white rounded divide-y divide-gray-100 shadow'
        >
          <div className='py-3 px-4 text-gray-500'>
            <span className='block text-sm font-semibold'>{user.name}</span>
            <span className='block text-sm font-light truncate '>
              {user?.email}
            </span>
          </div>
          <ul className='py-1 font-light text-gray-500 '>
            {userCardList.user.map((list, index) => (
              <li key={index}>
                <Link href={list.slug} className='block py-2 px-4 text-sm '>
                  {list.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className='py-1 font-light text-gray-500 '>
            {userCardList.pages.map((list, index) => (
              <li key={index}>
                <Link
                  href={list.slug}
                  className='inline-flex gap-2 items-center py-2 px-4 text-sm'
                >
                  {list.icon}
                  {list.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className='py-1 font-light text-gray-500 '>
            <li
              onClick={() => signOut()}
              className='block py-2 px-4 text-sm cursor-pointer'
            >
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
