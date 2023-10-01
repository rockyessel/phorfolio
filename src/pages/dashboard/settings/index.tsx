import DashboardLayout from '@/components/dashboard/layout';
import { User, UserAccountEnvProps } from '@/interface';
import { IdGen } from '@/utils/helpers';
import {
  createUserEnvVariable,
  getUsersEnvByUserId,
  isUserEnvAlreadyCreated,
  updateUserEnvVariable,
} from '@/utils/outerbase-req/users';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';



const initialUserAccountEnv: UserAccountEnvProps = {
  id: '',
  user_id: '',
  next_public_email:'',
  next_public_email_pass:'',
};

const UserSettings = () => {
  const [envVariable, setEnvVariable] = React.useState(initialUserAccountEnv);
  const [isContentCreatedBefore, setIsContentCreatedBefore] = React.useState<boolean>(false);

  const router = useRouter();

  const { data: session } = useSession();
  const user = { ...session?.user } as User;
  React.useEffect(() => {
    if (user.id) {
      isUserEnvAlreadyCreated(user.id).then((bool) =>
        setIsContentCreatedBefore(bool)
      );
    }
  }, [user.id, router]);

  React.useEffect(() => {
    if (user.id && isContentCreatedBefore) {
      getUsersEnvByUserId(user.id).then((envContent) =>
        setEnvVariable(envContent)
      );
    }
  }, [isContentCreatedBefore, user.id]);

  const handleHomeContentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;
    setEnvVariable((preEnvVar) => ({
      ...preEnvVar,
      [target.name]: target.value,
    }));
  };

  const handleHomeContentSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isContentCreatedBefore) {
      await updateUserEnvVariable(envVariable, user.id);
    } else {
      envVariable.id = IdGen('ENV');
      envVariable.user_id = user.id;
      await createUserEnvVariable(envVariable);
      router.replace(router.asPath);
    }
  };

  return (
    <DashboardLayout>
      <div className='col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow'>
        <div className='pt-4'>
          <h1 className='py-2 text-2xl font-semibold'>Account settings</h1>
        </div>
        <hr className='mt-4 mb-8' />
        <p className='py-2 text-xl font-semibold'>User</p>
        <div>
          <p className='text-gray-400'>
            Your email address is <strong>{session?.user?.email}</strong>
          </p>
        </div>
        <hr className='mt-4 mb-8' />
        <p className='py-2 text-xl font-semibold'>Environment Variables</p>
        <div>
          <form
            onSubmit={handleHomeContentSubmission}
            className='w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'
          >
            <fieldset>
              <p className='text-left'>E-mail Address (next_public_email)</p>
              <fieldset className='relative flex items-center mt-4 md:mt-2.5'>
                <input
                  type='password'
                  name='next_public_email'
                  placeholder={`***********`}
                  onChange={handleHomeContentChange}
                  className='w-full py-2.5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </fieldset>
            </fieldset>
            <fieldset>
              <p className='text-left'>
                Email Password (next_public_email_pass)
              </p>
              <fieldset className='relative flex items-center mt-4 md:mt-2.5'>
                <input
                  type='password'
                  name='next_public_email_pass'
                  placeholder={`***********`}
                  onChange={handleHomeContentChange}
                  className='w-full py-2.5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </fieldset>
            </fieldset>

            <fieldset>
              <button
                type='submit'
                title='Save'
                className='inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {isContentCreatedBefore ? 'Update Keys' : 'Publish'}
              </button>
            </fieldset>
          </form>
        </div>
        <hr className='mt-4 mb-8' />

        <div className='mb-10'>
          <p className='py-2 text-xl font-semibold'>Delete Account</p>
          <p className='inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-2 h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fill-rule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clip-rule='evenodd'
              />
            </svg>
            Proceed with caution
          </p>
          <p className='mt-2'>
            Make sure you have taken backup of your account in case you ever
            need to get access to your data. We will completely wipe your data.
            There is no way to access your account after this action.
          </p>
          <button className='ml-auto text-sm font-semibold text-rose-600 underline decoration-2'>
            Continue with deletion
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;
