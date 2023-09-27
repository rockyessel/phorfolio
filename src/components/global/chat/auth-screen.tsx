import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AuthScreen = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-40 rounded-full duration-150 ease-in-out hover:ring-8 hover:ring-rose-300 ring-2 ring-rose-700 h-40 overflow-hidden flex flex-col'>
          <Image
            src='/97303710.jfif'
            alt='Admin user'
            width={1000}
            height={1000}
            className='w-full h-full object-cover rounded-full ring-2 ring-rose-700'
          />
        </div>
        <Link
          href='/a/register'
          title='Register'
          className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
        >
          Authenticate
        </Link>
      </div>
    </div>
  );
};

export default AuthScreen;
