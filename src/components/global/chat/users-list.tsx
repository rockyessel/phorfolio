import axios from 'axios';
import React, { useState } from 'react';
import { dummyChatHistory } from './index';
import UserProfile from '../users/profile';

interface Props {
  setSelectedConversation: React.Dispatch<any>;
}

const ChatUsersList = (props: Props) => {
  const [users, setUsers] = useState<any[]>();
  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://dummyjson.com/users');

      const data = await response.json();

      console.log(data);
      return data;
    };

    fetchUser()
      .then((data) => setUsers(data?.users))
      .catch((error) => console.log(error));
  }, []);

  const message = ` This is our last message we sent, remember? If not then there's nothing i can do`;

  return (
    <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto overflow-x-hidden bg-white divide-y-[1px] divide-gray-700 divide-opacity-50 px-2'>
      {users?.map((user, index) => (
        <button
          title={user.name}
          type='button'
          onClick={() => props.setSelectedConversation(user)}
          key={index}
          className='flex items-center gap-2 py-2.5'
        >
          <UserProfile user={user} />
          <span>
            <span className='w-full inline-flex items-center justify-between'>
              <span>rockyessel</span>
              <span className='text-[12px] text-gray-300'>23:32</span>
            </span>
            <span>
              <span className='w-full inline-flex items-start text-[11px] truncate text-gray-500'>
                {message}
              </span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default ChatUsersList;
