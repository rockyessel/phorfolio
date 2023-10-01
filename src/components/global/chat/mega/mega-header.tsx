import React from 'react';
import UserProfile from '../../users/profile';
import { User } from '@/interface';
import { FiMoreVertical } from 'react-icons/fi';

interface Props {
  selectedConversation: string;
  user: User;
}

const MegaHeader = (props: Props) => {
  return (
    <div className='w-full flex items-center justify-between px-4 shadow-md shadow-rose-700 py-2'>
      <UserProfile user={props.user} />

      <span className='p-1 text-lg hover:bg-rose-700 bg-rose-700 cursor-pointer bg-opacity-50 rounded-full'>
        <FiMoreVertical />
      </span>
    </div>
  );
};

export default MegaHeader;
