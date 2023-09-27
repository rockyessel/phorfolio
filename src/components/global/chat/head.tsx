import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import UserProfile from '../users/profile';
import { User } from '@/interface';

interface Props {
  minimizeValue: string;
  setMinimizeValue: React.Dispatch<React.SetStateAction<string>>;
}

const ChatHead = (props: Props) => {
  // const [status, setStatus] = useState<'Live' | 'Message'>('Message');

  const { data: session, status } = useSession();
  const user = session?.user as User;

  return (
    <div className='w-full border-b-[1px] flex items-center justify-between px-4 py-3.5 text-black'>
      {status === 'authenticated' && user ? (
        <div className='flex items-center gap-2'>
          <UserProfile user={user} />
          <div>
            <p>{user.name}</p>
            <p className='text-gray-300 text-[12px]'>{user.email}</p>
          </div>
        </div>
      ) : (
        <span className='font-bold'>{status}</span>
      )}

      <span className='cursor-pointer'>
        {props.minimizeValue === '50' ? (
          <BsChevronDoubleUp onClick={() => props.setMinimizeValue('450')} />
        ) : (
          <BsChevronDoubleDown onClick={() => props.setMinimizeValue('50')} />
        )}
      </span>
    </div>
  );
};

export default ChatHead;
