import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { MessageProps, User } from '@/interface';
import { getUserById } from '@/utils/outerbase-req/users';

interface Props {
  message: MessageProps;
}

const UserChatWithTimestamp = (props: Props) => {
  const [user, setUser] = React.useState<User | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      const user = await getUserById(props.message.sender_id);
      setUser(user);
    };
    fetchData();
  }, [props.message.sender_id]);

  return (
    user && (
      <div className='py-1 rounded-md'>
        <div className='flex items-start hover:bg-gray-400 hover:text-black px-4 py-2 rounded-t-md gap-2'>
          <Image
            className='w-6 h-6 rounded-md'
            width={100}
            height={100}
            alt={user?.name}
            src={user?.image}
            priority
          />
          <p className='text-sm inline-flex items-center gap-2'>
            <span>{user?.name}</span>
            {'•'}
            <span className='text-gray-700'>
              {moment(props.message.created_at).format('LT')}
            </span>
          </p>
        </div>
        <div className='w-full'>
          <div className='ml-10 mt-0 hover:bg-gray-400 hover:text-black rounded-b-md px-4 relative prose-sm'>
            <p>{props.message.text}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default UserChatWithTimestamp;
