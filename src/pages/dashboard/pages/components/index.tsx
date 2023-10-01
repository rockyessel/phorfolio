import DashboardLayout from '@/components/dashboard/layout';
import { HomeContent } from '@/interface';
import { IdGen } from '@/utils/helpers';
import {
  createHomeContent,
  getHomeContentByUserId,
  isHomeContentCreated,
  updateHomeContent,
} from '@/utils/outerbase-req/components';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const initialHomeContent: HomeContent = {
  id: '',
  title: '',
  sub_title: '',
  description: '',
  footer_description: '',
  user_id: '',
};

const DashboardComponentsPage = () => {
  const [homeContent, setHomeContent] = React.useState(initialHomeContent);
  const [isContentCreatedBefore, setIsContentCreatedBefore] =
    React.useState<boolean>(false);

  const router = useRouter();

  const { data: session } = useSession();
  const user = { ...session?.user } as User;
  React.useEffect(() => {
    if (user.id) {
      isHomeContentCreated(user.id).then((bool) =>
        setIsContentCreatedBefore(bool)
      );
    }
  }, [user.id,router]);

  React.useEffect(() => {
    if (user.id && isContentCreatedBefore) {
      getHomeContentByUserId(user.id).then((home_content) =>
        setHomeContent(home_content)
      );
    }
  }, [isContentCreatedBefore, user.id]);

  console.log('homeContent: ', homeContent);

  const handleHomeContentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = event;
    setHomeContent((preHomeContent) => ({
      ...preHomeContent,
      [target.name]: target.value,
    }));
  };

  const handleHomeContentSubmission = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isContentCreatedBefore) {
      await updateHomeContent(homeContent, user.id);
    } else {
      homeContent.id = IdGen('COMPONENTS');
      homeContent.user_id = user.id;
      await createHomeContent(homeContent);
      router.replace(router.asPath);
    }
  };

  return (
    <DashboardLayout>
      <div className='col-span-8 overflow-hidden rounded-xl sm:px-8 sm:shadow'>
        <div className='pt-4'>
          <h1 className='py-2 text-2xl font-semibold'>Components</h1>
        </div>
        <hr className='mt-4 mb-8' />
        <p className='py-2 text-xl font-semibold'>Homepage(Hero)</p>
        <div>
          <form
            onSubmit={handleHomeContentSubmission}
            className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'
          >
            <fieldset>
              <p className='text-left'>Title()</p>
              <p className='text-left text-xs text-gray-400'>
                Provide full URL
              </p>
              <fieldset className='relative flex items-center mt-4 md:mt-0'>
                <input
                  type='text'
                  name='title'
                  value={homeContent?.title}
                  onChange={handleHomeContentChange}
                  placeholder={``}
                  className='w-full py-2.5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </fieldset>
            </fieldset>
            <fieldset>
              <p className='text-left'>Sub Title()</p>
              <p className='text-left text-xs text-gray-400'>
                Provide full URL
              </p>
              <fieldset className='relative flex items-center mt-4 md:mt-0'>
                <input
                  type='text'
                  name='sub_title'
                  value={homeContent?.sub_title}
                  onChange={handleHomeContentChange}
                  placeholder={``}
                  className='w-full py-2.5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </fieldset>
            </fieldset>
            <fieldset>
              <p className='text-left'>Description()</p>
              <p className='text-left text-xs text-gray-400'>
                Provide full URL
              </p>
              <fieldset className='relative flex items-center mt-4 md:mt-0'>
                <textarea
                  name='description'
                  value={homeContent?.description}
                  onChange={handleHomeContentChange}
                  placeholder={``}
                  className='w-full h-32 py-2.5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </fieldset>
            </fieldset>
            <fieldset>
              <p className='text-left'>Footer Description()</p>
              <p className='text-left text-xs text-gray-400'>
                Provide full URL
              </p>
              <fieldset className='relative flex items-center mt-4 md:mt-0'>
                <textarea
                  name='footer_description'
                  value={homeContent?.footer_description}
                  onChange={handleHomeContentChange}
                  placeholder={``}
                  className='w-full h-32  py-2.5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 px-2 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </fieldset>
            </fieldset>

            <fieldset>
              <button
                type='submit'
                title='Save'
                className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                {isContentCreatedBefore ? 'Update' : 'Save'}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardComponentsPage;
