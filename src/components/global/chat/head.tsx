import React from 'react';
import { User } from '@/interface';
import UserProfile from '../users/profile';
import { useSession } from 'next-auth/react';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';

interface Props {
  minimizeValue: string;
  setMinimizeValue: React.Dispatch<React.SetStateAction<string>>;
}

const ChatHead = (props: Props) => {
  const { data: session, status } = useSession();
  const user = session?.user as User;

  return (
    <div className='w-full border-b-[1px] flex items-center justify-between px-4 py-3.5 text-black'>
      {status === 'authenticated' && user ? (
        <div className='flex items-center gap-2'>
          <UserProfile user={user} />
          <div>
            <span>{user.name}</span>
            <span className='text-gray-300 text-[12px]'>{user.email}</span>
          </div>
        </div>
      ) : (
        <span className='font-bold'>Unauthenticated</span>
      )}

      <div className='cursor-pointer'>
        {props.minimizeValue === '50' ? (
          <BsChevronDoubleUp onClick={() => props.setMinimizeValue('450')} />
        ) : (
          <BsChevronDoubleDown onClick={() => props.setMinimizeValue('50')} />
        )}
      </div>
    </div>
  );
};

export default ChatHead;
