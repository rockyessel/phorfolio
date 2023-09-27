import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import EditorOutput from '@/components/EditorOutput';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import GithubCalendar from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import axios from 'axios';
import moment from 'moment';
import ProjectFeatureCard from '@/components/articles/feature-card';
import { getContent } from '@/utils/outerbase-req/about';
import Image from 'next/image';

const AboutPageTemp = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const [data, setData] = React.useState([]);
  console.log('data: ', data);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://github-contributions-api.jogruber.de/v4/rockyessel'
      );
      return data;
    };

    fetchData().then((data) => setData(data));
  }, []);

  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 pb-5 mt-5 md:mt-28'>
      <EditorOutput content={props.aboutData} />
      <section className='flex items-center flex-wrap gap-2'>
        <section>
          <p className=' mb-2'>I write @</p>
          <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Hashnode'
                  src='/hashnode.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Hackernoon'
                  src='/hackernoon.jpeg'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Medium'
                  src='/medium.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Dev.to'
                  src='/devto.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='FreeCodeCamp'
                  src='/freecodecamp.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Velog'
                  src='/celog.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
          </section>
        </section>
        <section>
          <p className=' mb-2'>Language</p>
          <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='JavaScript'
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Rust'
                  src='https://user-images.githubusercontent.com/739070/62526177-3fcb4700-b828-11e9-8c7a-4e31dbf65dc7.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Python'
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
          </section>
        </section>
        <section>
          <p className=' mb-2'>Other Technologies</p>
          <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='TailwindCSS'
                  src='https://logowik.com/content/uploads/images/tailwind-css3232.logowik.com.webp'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Postman'
                  src='https://seeklogo.com/images/P/postman-logo-F43375A2EB-seeklogo.com.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
          </section>
        </section>
        <section>
          <p className=' mb-2'>Database</p>
          <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='MongoDB'
                  src='https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Grafbase'
                  src='https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/zmioylxee5muastly7fg'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Appwrite'
                  src='https://www.finsmes.com/wp-content/uploads/2021/09/appwrite.jpg'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Supabase'
                  src='https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/588/400/original/profile_pic.png?1665772600'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Outerbase'
                  src='https://img.stackshare.io/service/48767/default_eee7d4a4bbbebe485d009f036c051d5640918ab2.jpg'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
          </section>
        </section>
        <section>
          <p className=' mb-2'>Version Control</p>
          <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Git'
                  src='https://i.pinimg.com/originals/01/e5/00/01e500fca29c045d432b64f285f9c229.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
          </section>
        </section>
        <section>
          <p className=' mb-2'>Web Development Frameworks</p>
          <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='React.JS'
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Next.JS'
                  src='https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Node.JS'
                  src='https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='Express.JS'
                  src='https://youteam.io/blog/wp-content/uploads/2022/04/expressjs_logo.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
            <a
              target='_blank'
              href=''
              className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
            >
              <p className='relative'>
                <span className='absolute top-0 text-[9px] bg-gray-50 rounded-lg p-1 text-black'>
                  12 <span className='hidden'>articles</span>
                </span>
                <Image
                width={1000}
                height={1000}
                  title='FastAPI'
                  src='https://w7.pngwing.com/pngs/141/126/png-transparent-fastapi-hd-logo-thumbnail.png'
                  className='w-10 h-10 rounded-lg'
                  alt=''
                />
              </p>
            </a>
          </section>
        </section>

        <section>
          <p className='text-2xl'>
            Feature Projects{' '}
            <span className='text-xs text-gray-300'>
              These are very exciting project that I&apos;ve built.
            </span>
          </p>
          <section className='flex flex-col gap-2'>
            <ProjectFeatureCard />
            <ProjectFeatureCard />
            <ProjectFeatureCard />
            <ProjectFeatureCard />
            <ProjectFeatureCard />
          </section>
        </section>

        <GithubCalendar
          username='rockyessel'
          blockSize={15}
          blockMargin={5}
          fontSize={16}
          hideColorLegend={true}
          showWeekdayLabels
          renderBlock={(block, activity) =>
            React.cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': `${activity.count} contributions on ${moment(
                activity.date
              ).format('LL')}`,
            })
          }
          theme={{
            light: ['#FFD4D9', '#FFA8B2', '#FF7A8B', '#FF4D63', '#A41626'],
          }}
        />
        <ReactTooltip
          style={{ backgroundColor: '#881337', color: '#FFF' }}
          id='react-tooltip'
        />
      </section>
    </main>
  );
};

export default AboutPageTemp;
export const getStaticProps: GetStaticProps<{
  aboutData: OutputData | undefined;
}> = async () => {
  const aboutData = await getContent();
  //   if (!aboutData) return { notFound: true };
  return {
    props: { aboutData: JSON.parse(JSON.stringify(aboutData)) },
    revalidate: 5,
  };
};
