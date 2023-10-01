import React from 'react';
import Link from 'next/link';
import AudioCastPlayer from './audio';
import { FaEye } from 'react-icons/fa';
import { ProjectItem } from '@/interface';
import { AiFillLike } from 'react-icons/ai';
import ProjectStatusSubHeader from './status';
import { toolSkills } from '@/utils/constants/global';
import { likeProject } from '@/utils/outerbase-req/projects';

interface Props {
  data: ProjectItem;
}

const ProjectHeader = (props: Props) => {
  const [likedState, setLikedState] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState(props.data.liked_count);
  const tools = props.data?.tags?.split(',')?.map((tool) => tool.trim().toLocaleLowerCase());

  return (
    <header className='flex flex-col gap-2'>
      <ProjectStatusSubHeader data={props.data} />
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
          <button
            onClick={() => {
              if (!likedState) {
                const handleLikeProject = async () => {
                  likeProject(props.data.id).then((res) =>
                    console.log('Liked')
                  );
                  setLikedState(true);
                  setLikeCount(props.data.liked_count + 1);
                };
                handleLikeProject();
              }
            }}
            className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '
          >
            <span className='flex items-center gap-2 m-0'>
              <AiFillLike
                className={`p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white ${
                  likedState ? 'bg-rose-700' : ''
                }  group-hover:text-rose-700`}
              />
              <span className='text-[12px] text-gray-200'>{likeCount}</span>
            </span>
          </button>
          <div className='w-fit p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
            <span className='flex items-center gap-2 m-0'>
              <FaEye className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
              <span className='text-[12px] text-gray-200'>
                {props.data.seen_count}
              </span>
            </span>
          </div>
          {'•'} <AudioCastPlayer audio_url={props.data.audio_url} />
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
