import React from 'react';
import Link from 'next/link';
import { useSnapshot } from 'valtio';
import { RiSettings2Fill } from 'react-icons/ri';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { SidebarState, accordionSideList } from '@/utils/constants/native/sidebar';

const Sidebar = () => {
  const [clicked, setClicked] = React.useState<number | null>(0);
  const snap = useSnapshot(SidebarState);

  const toggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };


  return (
    <aside
      className={`flex-shrink-0 hidden border-r overflow-y-auto h-[93vh] pb-5 transition-all md:block duration-150 ease-in-out ${snap.collapsed ? 'w-0' : 'w-64'}`}>
      <nav className='flex flex-col w-full h-full justify-between'>
        <ul className='flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto'>
          {accordionSideList.map((listItem, index) => (
            <li key={index}>
              <span
                className='flex items-center p-2 gap-2 transition-colors rounded-md hover:bg-rose-500'
                onClick={() => toggle(index)}
              >
                {listItem.icon}
                {listItem.slug && listItem.list.length === 0 ? (
                  <Link href={listItem.slug}>{listItem.name}</Link>
                ) : (
                  <span className='cursor-pointer w-full inline-flex items-center justify-between'>
                    {listItem.name}{' '}
                    {clicked === index ? (
                      <MdArrowDropUp />
                    ) : (
                      <MdArrowDropDown />
                    )}
                  </span>
                )}
              </span>
              {clicked === index ? (
                <ul className='ml-4'>
                  {listItem.list.map((subList, _index) => (
                    <li
                      className='flex items-center p-2 transition-colors rounded-md hover:bg-rose-500'
                      key={_index}
                    >
                      <Link href={subList.slug}>{subList.name}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <div className='flex-shrink-0'>
          <Link
            href='/dashboard/settings'
            className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'>
            <RiSettings2Fill />
            <span>Account</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
