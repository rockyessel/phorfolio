import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { GoLink } from 'react-icons/go';
import { Tooltip } from 'react-tooltip';
import { ArticleItem } from '@/interface';
import { AbbrevNumber } from '@/utils/helpers';
import { AiOutlineComment, AiOutlineEye, AiOutlineFieldTime } from 'react-icons/ai';

interface Props {
  data: ArticleItem;
}

const ArticleHeader = (props: Props) => {
  const viewCount = AbbrevNumber(props.data?.seen_count);
  
  return (
    <React.Fragment>
      <div className='flex items-center justify-between mb-4'>
        <div className={`flex gap-2 font-medium max_screen:text-sm text-[1.3rem]`} >
          <span className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
            <span className='flex items-center gap-2 m-0'>
              <AiOutlineComment className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />{' '}
              {props.data?.comments_count}
            </span>
          </span>
          <span className='p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
            <span className='flex items-center gap-2 m-0'>
              <AiOutlineEye className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
              {viewCount}
            </span>
          </span>
          <div className='inline-flex gap-2 p-1 rounded-lg group ring-[1px] ring-rose-700 ring-opacity-50 hover:ring-2 hover:ring-rose-600 '>
            <AiOutlineFieldTime className='p-1 rounded-lg border-[1px] border-rose-700 text-4xl group-hover:border-white group-hover:text-rose-700' />
            <span>•</span>
            {moment(props.data?.published_datetime).format('LT')}
          </div>
        </div>
        <div
          data-tooltip-id='my-tooltip'
          data-tooltip-content='Linked to project.'
          data-tooltip-place='bottom'
          className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'
        >
          <div className='inline-flex items-center border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500 gap-2'>
            <Image
              width={20}
              height={20}
              title='React.JS'
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
              className='h-auto object-cover object-center w-8 border-rose-400 border-[1px] border-opacity-70 p-1 rounded-lg'
              alt=''
            />
            <p className='font-bold text-lg'>Klaudbox</p>
            <Link
              href='/projects/'
              className='p-1 rounded-lg hover:border-rose-700 hover:border-opacity-60 hover:border-[1px] h-fit w-fit'
            >
              <GoLink />
            </Link>
          </div>
        </div>
      </div>
      <Tooltip
        style={{ backgroundColor: '#000', color: '#FFF' }}
        id='my-tooltip'
      />
    </React.Fragment>
  );
};

export default ArticleHeader;
