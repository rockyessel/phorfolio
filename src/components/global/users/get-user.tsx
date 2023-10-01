import React from 'react';
import Image from 'next/image';
import { User } from '@/interface';
import { getUserById } from '@/utils/outerbase-req/users';

interface Props {
  userId: string | undefined;
  time?: string | undefined;
}

const GetUserData = (props: Props) => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (props.userId) getUserById(props.userId).then((user) => setUser(user));
  }, [props.userId]);

  return (
    user && (
      <div className='w-full flex items-center gap-4'>
        <Image
          title={user.name}
          alt={user.name}
          width={500}
          height={500}
          src={user.image}
          className='border-2 border-rose-700 w-12 h-12 object-cover object-center rounded-full'
        />
        <div className='flex items-start gap-2'>
          <p className='inline-flex flex-col'>
            <span>{user.name}</span>
            <span className='text-gray-400 text-xs ml-2'>@{user.username}</span>
          </p>
          {' • '}
          {props.time && <p className='text-sm text-gray-300'>{props.time}</p>}
        </div>
      </div>
    )
  );
};

export default GetUserData;

{
  /*

 <div className='flex items-center'>
          <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
            <Image
              width={100}
              height={100}
              className='mr-2 w-6 h-6 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
              alt='Michael Gough'
            />
            Michael Gough
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            <time title='February 8th, 2022'>Feb. 8, 2022</time>
          </p>
        </div>
*/
}
