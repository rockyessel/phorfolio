import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import AuthForm from './form';
import AuthButtons from './buttons';
import { toast } from 'react-toastify';
import { createUserByCredentials } from '@/utils/outerbase-req/users';
import { User } from '@/interface';
import { IdGen } from '@/utils/helpers';
import axios, { AxiosError } from 'axios';

interface Props {
  type: string;
}

const initialAuthForm: User = {
  id: '',
  username: '',
  name: '',
  email: '',
  password: '',
  image: '',
};

const AuthUI = (props: Props) => {
  const [showCredentialsForm, setShowCredentialsForm] = React.useState(false);

  const [authForm, setAuthForm] = React.useState(initialAuthForm);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setAuthForm((authFormValues) => ({
      ...authFormValues,
      [target.name]: target.value,
    }));
  };

  const handleSignIn = async (user: User) => {
    const result = await signIn('credentials', {
      ...user,
      redirect: false,
      // callbackUrl: '/dashboard',
    });

    // if (result?.error) {
    //   toast.error(result.error);
    // } else if (result?.ok) {
    //   toast.success('Login successful');
    // }
  };

  const handleSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      if (props.type === 'register') {
        const l = toast.loading('Creating account...');
        const response = await axios.post('/api/register', { ...authForm });
        const data = response.data as {
          error?: string;
          success: boolean;
          data?: User;
        };
        if (data.success && data.data) {
          toast.done(l);
          toast.success('Account created');
          await handleSignIn(data.data);
        }
      } else if (props.type === 'login') {
        const l = toast.loading('Logging you in account...');
        await handleSignIn(authForm);
        toast.done(l);
      }
    } catch (error) {
      toast.dismiss();
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const err =
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data;
        if (err && typeof err === 'object' && 'error' in err) {
          // Ensure 'err' is an object with an 'error' property
          const errorMessage = err.error;
          toast.error(`Account not created. Error: ${errorMessage}`);
        } else {
          toast.error('Account not created. Something went wrong');
        }
      } else {
        toast.error('Account not created. Something went wrong');
      }
    }
  };
  return (
    <main>
      <section className='flex flex-col  items-center'>
        <div className='w-full md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12 flex items-center justify-center'>
          <div className='w-full h-100'>
            <h1 className='text-xl text-white md:text-2xl font-bold leading-tight mt-12'>
              {props.type === 'register'
                ? 'Register & Starting Documenting'
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
                  href={
                    process.env.NODE_ENV === 'production'
                      ? 'https://phorfolio.site/a/register'
                      : 'http://test.com:3000/a/register'
                  }
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
