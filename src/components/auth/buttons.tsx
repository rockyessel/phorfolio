import { signIn } from 'next-auth/react';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

interface Props {
  type: string;
}

const AuthButtons = (props: Props) => {
  return (
    <div>
      <div className='flex flex-col gap-2 capitalize'>
        <button
          title={props.type === 'register' ? 'Register with X' : 'Login with X'}
          onClick={() => signIn('twitter')}
          type='button'
          className='w-full block capitalize bg-white border rounded-md gap-x-2 hover:bg-transparent hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700 text-gray-900 font-semibold px-4 py-3'
        >
          <div className='flex items-center justify-center'>
            <RiTwitterXFill />
            <span className='ml-4'>
              {props.type === 'register' ? 'Register with X' : 'Login with X'}
            </span>
          </div>
        </button>
        <button
          onClick={() => signIn('github')}
          title={
            props.type === 'register'
              ? 'register with Github'
              : 'Login with Github'
          }
          type='button'
          className='w-full block capitalize bg-white border rounded-md gap-x-2 hover:bg-transparent hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700 text-gray-900 font-semibold px-4 py-3'
        >
          <div className='flex items-center justify-center'>
            <FaGithub />
            <span className='ml-4'>
              {props.type === 'register'
                ? 'register with Github'
                : 'Login with Github'}
            </span>
          </div>
        </button>
        <button
          type='button'
          title={
            props.type === 'register'
              ? 'register with Google'
              : 'Login with Google'
          }
          onClick={() => signIn('google')}
          className='w-full block capitalize bg-white border rounded-md gap-x-2 hover:bg-transparent hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700 text-gray-900 font-semibold px-4 py-3'
        >
          <div className='flex items-center justify-center'>
            <FaGoogle />
            <span className='ml-4'>
              {props.type === 'register'
                ? 'register with Google'
                : 'Login with Google'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AuthButtons;
