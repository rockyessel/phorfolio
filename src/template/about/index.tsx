import React from 'react';
import EditorOutput from '@/components/EditorOutput';
import GithubCalendar from 'react-github-calendar';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import moment from 'moment';
import ProjectFeatureCard from '@/components/articles/feature-card';
import TemplateLayout from '@/components/template/layout';
import { AboutMe } from '@/interface';
import { decodeBase64ToObject, deserialize } from '@/utils/helpers';
import { OutputData } from '@editorjs/editorjs';
import Image from 'next/image';
import { getToolLogoUrl } from '@/utils/constants/about';

interface Props {
  aboutData: AboutMe;
}

const AboutPageTemp = (props: Props) => {
  const decodedContent = decodeBase64ToObject(props.aboutData?.content);
  const deserializeContent: OutputData = deserialize(decodedContent);

  const web_frameworks = props.aboutData?.web_framework.split(',');
  const library = props.aboutData?.library.split(',');
  const testing = props.aboutData?.testing.split(',');
  const db = props.aboutData?.db.split(',');
  const langs = props.aboutData?.lang.split(',');
  const vc = props.aboutData?.version_control.split(',');
  console.log('langs: ', langs);
  const {
    hackernoon_url,
    devto_url,
    hashnode_url,
    medium_url,
    velog_url,
    freecodecamp_url,
  } = props.aboutData;

  return (
    <TemplateLayout
      description={''}
      title={`About ${props.aboutData?.full_name}`}
      image={props.aboutData?.profile_url}
      type={'Portfolio'}
      alt={props.aboutData?.full_name}
      keywords={`${props.aboutData?.library}${props.aboutData?.web_framework}`}
      publishedAt={new Date().toISOString()}
      updatedAt={new Date().toISOString()}
      MIME={`${props?.aboutData?.profile_url?.split('.').pop()}`}
      author_name={props.aboutData?.full_name}
    >
      <EditorOutput content={deserializeContent} />

      <section className='flex flex-col gap-2'>
        <p className='text-2xl'>Skills & Tools</p>
        <section className='flex items-start flex-wrap gap-2'>
          {/* Write */}
          <section>
            <p className=' mb-2'>I write @</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {hashnode_url !== '' && (
                <a
                  target='_blank'
                  href={hashnode_url}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title='Hashnode'
                      src='/hashnode.png'
                      className='w-10 h-10 rounded-lg'
                      alt=''
                    />
                  </span>
                </a>
              )}
              {hackernoon_url !== '' && (
                <a
                  target='_blank'
                  href={hackernoon_url}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title='Hackernoon'
                      src='/hackernoon.jpeg'
                      className='w-10 h-10 rounded-lg'
                      alt=''
                    />
                  </span>
                </a>
              )}
              {medium_url !== '' && (
                <a
                  target='_blank'
                  href={medium_url}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
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
                  </span>
                </a>
              )}
              {devto_url !== '' && (
                <a
                  target='_blank'
                  href={devto_url}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title='Dev.to'
                      src='/devto.png'
                      className='w-10 h-10 rounded-lg'
                      alt=''
                    />
                  </span>
                </a>
              )}
              {freecodecamp_url !== '' && (
                <a
                  target='_blank'
                  href={freecodecamp_url}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title='FreeCodeCamp'
                      src='/freecodecamp.png'
                      className='w-10 h-10 rounded-lg'
                      alt=''
                    />
                  </span>
                </a>
              )}
              {velog_url !== '' && (
                <a
                  target='_blank'
                  href={velog_url}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title='Velog'
                      src='/celog.png'
                      className='w-10 h-10 rounded-lg'
                      alt=''
                    />
                  </span>
                </a>
              )}
            </section>
          </section>

          <section>
            <p className=' mb-2'>Language</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {langs.map((lang, index) => (
                <div
                  key={index}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title={lang}
                      src={getToolLogoUrl(lang)}
                      className='w-10 h-10 rounded-lg'
                      alt={lang}
                    />
                  </span>
                </div>
              ))}
            </section>
          </section>

          <section>
            <p className=' mb-2'>Web Frameworks</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {web_frameworks.map((framework, index) => (
                <div
                  key={index}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title={framework}
                      src={getToolLogoUrl(framework)}
                      className='w-10 h-10 rounded-lg'
                      alt={framework}
                    />
                  </span>
                </div>
              ))}
            </section>
          </section>

          <section>
            <p className=' mb-2'>Database</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {db.map((db, index) => (
                <div
                  key={index}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title={db}
                      src={getToolLogoUrl(db)}
                      className='w-10 h-10 rounded-lg'
                      alt={db}
                    />
                  </span>
                </div>
              ))}
            </section>
          </section>

          <section>
            <p className=' mb-2'>Version Control</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {vc.map((vc, index) => (
                <div
                  key={index}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title={vc}
                      src={getToolLogoUrl(vc)}
                      className='w-10 h-10 rounded-lg'
                      alt={vc}
                    />
                  </span>
                </div>
              ))}
            </section>
          </section>

          <section>
            <p className=' mb-2'>Testing Package/Library</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {testing.map((test, index) => (
                <div
                  key={index}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title={test}
                      src={getToolLogoUrl(test)}
                      className='w-10 h-10 rounded-lg'
                      alt={test}
                    />
                  </span>
                </div>
              ))}
            </section>
          </section>

          <section>
            <p className=' mb-2'>Library</p>
            <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
              {library.map((lib, index) => (
                <div
                  key={index}
                  className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
                >
                  <span className='relative'>
                    <Image
                      width={1000}
                      height={1000}
                      title={lib}
                      src={getToolLogoUrl(lib)}
                      className='w-10 h-10 rounded-lg'
                      alt={lib}
                    />
                  </span>
                </div>
              ))}
            </section>
          </section>
        </section>

        <section className='mt-10'>
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

        {props.aboutData?.show_github_graph && (
          <React.Fragment>
            <GithubCalendar
              username={`${props.aboutData?.github_username}`}
              blockSize={15}
              blockMargin={5}
              fontSize={16}
              hideColorLegend={true}
              showWeekdayLabels
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  'data-tooltip-id': 'react-tooltip',
                  'data-tooltip-html': `${
                    activity.count
                  } contributions on ${moment(activity.date).format('LL')}`,
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
          </React.Fragment>
        )}
      </section>
    </TemplateLayout>
  );
};

export default AboutPageTemp;
