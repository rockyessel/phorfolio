import { ArticleItem } from '@/interface';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineComment, AiOutlineEye } from 'react-icons/ai';
import { MdOutlineReadMore } from 'react-icons/md';
import { toolSkills } from '@/utils/constants/global';
import { AbbrevNumber } from '@/utils/helpers';


interface Props {
  data: ArticleItem;
}

const ArticleCard = (props: Props) => {
  const tags = props.data?.tags?.split(',').map((tag) => tag.trim());
  const viewCount = AbbrevNumber(props.data.seen_count);
  console.log('viewCount', props.data.seen_count);

  const MAX_TITLE: number = 70;
  const MAX_DESCRIPTION: number = 157;
  const sliceDes: string = `${props.data?.description?.slice(
    0,
    MAX_DESCRIPTION
  )}...`;
  const sliceTitle: string = `${props.data?.title?.slice(0, MAX_TITLE)}...`;
  const isTitleLonger: boolean = props.data?.title?.length > MAX_TITLE;
  const isDesLonger: boolean =
    props.data?.description?.length > MAX_DESCRIPTION;
  return (
    <li className='group bg-[#18202b] md:bg-transparent w-full h-auto relative cursor-pointer rounded-md items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-[#18202b]/30'>
      <div className='hidden md:block md:h-[15rem] w-full'>
        <Image
          className='hidden md:block h-full w-full rounded-md object-cover object-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125'
          src={props.data?.image}
          alt=''
          width={1000}
          height={1000}
        />
      </div>

      <div className='md:absolute hidden md:block inset-0 group-hover:backdrop-blur-[2px] bg-gradient-to-b from-transparent via-[#18202b]/90 to-[#18202b] group-hover:from-[#18202b]/[1] group-hover:via-[#18202b]/80 group-hover:to-[#18202b]/[1]'></div>

      <div className='md:absolute w-full h-auto md:inset-0 flex md:translate-y-[40%] flex-col items-start p-4 transition-all duration-500 md:group-hover:translate-y-0'>
        <div className='flex gap-2 items-center'>
          <div className='font-medium rounded-md after:content-["・"] after:pl-2 after:text-xs after:mb-5'>
            <span>{props.data?.reading_minutes} Minutes Read</span>
          </div>

          <div className={`flex gap-2 items-center font-medium`}>
            <span className={`inline-flex items-center rounded-md gap-1`}>
              <AiOutlineComment className={`text-lg`} />
              {props.data?.comments_count}
            </span>

            <span className={`inline-flex items-center rounded-md gap-1`}>
              <AiOutlineEye className={`text-lg`} />
              {viewCount}
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-0'>
          <div className='m-0 p-0'>
            <h1 className='font-noe text-lg font-bold'>
              {isTitleLonger ? sliceTitle : props.data?.title}
            </h1>
            <p className='md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100'>
              {isDesLonger ? sliceDes : props.data?.description}
            </p>
          </div>

          <div className='flex justify-between items-center text-[2.6rem]'>
            <ul className='rounded-md py-2 flex flex-wrap gap-1 items-center'>
              {toolSkills?.map((list, index) =>
                tags?.includes(list.name) ? (
                  <Link
                    key={index}
                    href={`/project/${list.name.toLocaleLowerCase()}`}
                  >
                    <li
                      className=' text-xs cursor-pointer inline-flex items-center gap-1 border border-rose-500 text-white p-1 font-medium'
                      title={list?.name}
                    >
                      {list?.icon} {list?.name}
                    </li>
                  </Link>
                ) : null
              )}
            </ul>

            <div className='group flex items-center gap-5'>
              <Link href={`/articles/${props.data?.slug}`}>
                <span title='Read more'>
                  <MdOutlineReadMore />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ArticleCard;
