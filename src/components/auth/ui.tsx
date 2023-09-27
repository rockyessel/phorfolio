import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import AuthForm from './form';
// import {
//   createUserWithCredentials,
//   validateUser,
// } from '@/utils/outerbase-req/users';
import AuthButtons from './buttons';

interface Props {
  type: string;
}

const AuthUI = (props: Props) => {
  const [showCredentialsForm, setShowCredentialsForm] = React.useState(false);

  const [authForm, setAuthForm] = React.useState({ email: '', password: '' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setAuthForm((authFormValues) => ({
      ...authFormValues,
      [target.name]: target.value,
    }));
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (props.type === 'register') {
      // const createUser = await createUserWithCredentials(authForm);
    } else if (props.type === 'login') {
      // const isUserCredValid = await validateUser(authForm);
    }

    await signIn('credentials', {
      ...authForm,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <main>
      <section className='flex flex-col  items-center'>
        <div className='w-full md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
          <div className='w-full h-100'>
            <h1 className='text-xl text-white md:text-2xl font-bold leading-tight mt-12'>
              {props.type === 'register '
                ? 'Registration form'
                : 'Have an account? Login'}
            </h1>

            {showCredentialsForm ? (
              <AuthForm
                authForm={authForm}
                handleChange={handleChange}
                onSubmit={handleSubmission}
                type={props.type}
              />
            ) : (
              <button
                type='button'
                title={
                  props.type === 'register'
                    ? 'Register with email'
                    : 'Login with email'
                }
                onClick={() => setShowCredentialsForm((preState) => !preState)}
                className='w-full block px-4 py-3 mt-6 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {props.type === 'register'
                  ? 'register with email'
                  : 'Login with email'}
              </button>
            )}

            <hr className='my-6 border-gray-300 w-full' />
            {!showCredentialsForm ? (
              <AuthButtons type={props.type} />
            ) : (
              <button
                type='button'
                title={
                  props.type === 'register'
                    ? 'Register with Socials'
                    : 'Login with Socials'
                }
                onClick={() => setShowCredentialsForm((preState) => !preState)}
                className='w-full block px-4 py-3 mt-6 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {props.type === 'register'
                  ? 'Register with Socials'
                  : 'Login with Socials'}
              </button>
            )}
            {props.type === 'register' ? (
              <p className='mt-8'>
                Have an account?{' '}
                <Link
                  href='/a/login'
                  className='text-rose-500 hover:text-rose-700 font-semibold'
                >
                  Log into account.
                </Link>
              </p>
            ) : (
              <p className='mt-8'>
                Need an account?{' '}
                <Link
                  href='/a/register'
                  className='text-rose-500 hover:text-rose-700 font-semibold'
                >
                  Create an account
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthUI;
