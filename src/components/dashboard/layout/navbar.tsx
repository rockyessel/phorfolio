import React from 'react';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { FaGithub } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { BsLayoutSidebar } from 'react-icons/bs';
import UserMenu from '@/components/global/users/menu';
import { SidebarState } from '@/utils/constants/native/sidebar';

const Navbar = (): JSX.Element => {
  const { status } = useSession();
  const snap = useSnapshot(SidebarState);

  const handleCollapse = () => {
    const defaultState = snap.collapsed;
    SidebarState.collapsed = !defaultState;
  };

  return (
    <header
      className={`z-[4] w-full bg-[#0e141b] h-auto sticky top-0 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  md:mx-auto transition-all duration-400 border-b border-white`}
    >
      <nav className='flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-4'>
          <Link href='/'>
            <div className='flex items-center gap-1 z-[10]'>
              <span className='font-astroz text-3xl p-2 transition-all duration-500 rounded-full bg-rose-900 hover:text-rose-900 hover:bg-white'>
                {`<po/>`}
              </span>
            </div>
          </Link>

          <button title='Sidebar Toggle' type='button' onClick={handleCollapse}>
            <span className='sr-only'>Toggle Navigation</span>
            <BsLayoutSidebar className='text-2xl' />
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
            <span className='flex items-center gap-2 m-0'>
              <FaGithub className='p-1 rounded-lg border-[1px] border-rose-700 text-3xl group-hover:border-white group-hover:text-rose-700' />
            </span>
          </div>

          {status === 'unauthenticated' && (
            <Link
              href={
                process.env.NODE_ENV === 'production'
                  ? 'https://phorfolio.site/a/register'
                  : 'http://test.com:3000/a/register'
              }
              className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Authenticate
            </Link>
          )}

          <UserMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
