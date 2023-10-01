import React from 'react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface Props {
  type: string;
}

const handleAuthButton = async (authType: string) => {
  const result = await signIn(authType, {
    redirect: true,
    callbackUrl: '/dashboard',
  });

  if (result?.error) {
    toast.error(result.error);
  } else {
    toast.success('Sign-in successful');
  }
};

const AuthButtons = (props: Props) => {
  return (
    <div>
      <div className='flex flex-col gap-2 capitalize'>
        <button
          title={props.type === 'register' ? 'Register with X' : 'Login with X'}
          onClick={() => handleAuthButton('twitter')}
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
          onClick={() => handleAuthButton('github')}
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
          onClick={() => handleAuthButton('google')}
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
