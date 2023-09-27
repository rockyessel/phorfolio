import { User } from '@/interface';
import Image from 'next/image';
import React from 'react';

interface Props {
  user: User
}

const UserProfile = (props:Props) => {
  return (
    <Image
      title={props.user.name}
      alt={props.user.name}
      width={500}
      height={500}
      src={props.user.image}
      className='border-2 border-rose-700 w-12 h-12 object-cover object-center rounded-full'
    />
  );
};

export default UserProfile;
