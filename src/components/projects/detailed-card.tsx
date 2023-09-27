import { ProjectItem } from '@/interface';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { OutputData } from '@editorjs/editorjs';
import EditorOutput from '../EditorOutput';
import { PiCertificate } from 'react-icons/pi';
import { GrDeploy } from 'react-icons/gr';
import { SiVercel, SiWebmoney } from 'react-icons/si';
import { TbPlaneDeparture } from 'react-icons/tb';
import { BsGithub } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import AudioCastPlayer from './audio';
import { decodeBase64ToObject, deserialize } from '@/utils/helpers';
import { toolSkills } from '@/utils/constants/global';
interface Props {
  data: ProjectItem;
}

const ProjectDetailsCard = (props: Props) => {
console.log('props: ', props);



  const [image, setImage] = React.useState<number>(0);
  const tools = props.data?.tags
    ?.split(',')
    ?.map((tool) => tool.trim().toLocaleLowerCase());
  const images = props.data?.images?.split(',')?.map((image) => image.trim());
  const decodedContent = decodeBase64ToObject(props.data?.content);
  const deserializeContent: OutputData = deserialize(decodedContent);

  return (
    <React.Fragment>
      <header className='flex flex-col gap-2'>
        <div className='w-full flex items-center justify-between gap-2 flex-wrap mb-2'>
          <div className='flex items-center gap-2 flex-wrap mb-2'>
            <a
              target={`_blank`}
              href={props.data?.live_demo_url}
              className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '
            >
              <span className='flex items-center gap-2 m-0'>
                <SiWebmoney className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
                {/* <span className='text-[12px] text-gray-200'>See Live</span> */}
              </span>
            </a>
            <a
              target={`_blank`}
              href={props.data?.github_repo}
              className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '
            >
              <span className='flex items-center gap-2 m-0'>
                <BsGithub className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
                {/* <span className='text-[12px] text-gray-200'>Github</span> */}
              </span>
            </a>
          </div>

          <div className='flex items-center gap-2 flex-wrap mb-2'>
            <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
              <span className='flex items-center gap-2 m-0'>
                <PiCertificate className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
              </span>
            </div>
            <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
              <span className='flex items-center gap-2 m-0'>
                <TbPlaneDeparture className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
              </span>
            </div>
            <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
              <span className='flex items-center gap-2 m-0'>
                <SiVercel className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
              </span>
            </div>
          </div>
        </div>
        <h1 className='font-extrabold max_screen:text-4xl text-5xl capitalize'>
          {props.data?.title}
        </h1>

        <div className='w-full flex items-center justify-between gap-2 flex-wrap mb-2'>
          <div>
            <ul className='rounded-md py-2 flex flex-wrap gap-2 items-center'>
              {toolSkills?.map((list, index) =>
                tools?.includes(list.name.toLocaleLowerCase()) ? (
                  <Link
                    key={index}
                    href={`/project/${list.name.toLocaleLowerCase()}`}
                  >
                    <li
                      className='tooltip cursor-pointer inline-flex items-center gap-1 border border-rose-500 text-white p-1 font-medium'
                      data-tip={list?.name}
                    >
                      {list?.icon} {list?.name}
                    </li>
                  </Link>
                ) : null
              )}
            </ul>
          </div>

          <div className='flex items-center gap-2 flex-wrap mb-2'>
            <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
              <span className='flex items-center gap-2 m-0'>
                <AiFillLike className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
                <span className='text-[12px] text-gray-200'>12.32K</span>
              </span>
            </div>
            <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
              <span className='flex items-center gap-2 m-0'>
                <FaEye className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
                <span className='text-[12px] text-gray-200'>123.2K</span>
              </span>
            </div>
            {'•'} <AudioCastPlayer audio_url={props.data.audio_url} />
          </div>
        </div>
      </header>
      <main>
        <div>
          <Image
            className='w-full rounded-md mb-4 shadow-md'
            src={images && images[image]}
            width={1000}
            height={1000}
            alt=''
            priority
          />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          {images?.map((img, index) => (
            <Image
              key={index}
              className='rounded-sm mb-4 w-10 sm:w-16 md:w-24 md:h-20 object-cover object-center shadow-md'
              src={img !== null ? img : ''}
              width={1000}
              height={1000}
              onClick={() => setImage(index)}
              alt={props.data?.title}
              priority
            />
          ))}
        </div>

        <div>
          <EditorOutput content={deserializeContent} />
        </div>
      </main>
      <footer></footer>
    </React.Fragment>
  );
};

export default ProjectDetailsCard;
