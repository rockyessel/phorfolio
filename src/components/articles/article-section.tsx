import React from 'react';
import Link from 'next/link';
import ArticleCard from './card';
import { ArticleItem } from '@/interface';
import { MdArrowForward } from 'react-icons/md';

interface Props {
  articles: ArticleItem[];
}

const ArticleSection = (props: Props) => {
  return (
    <section className='flex flex-col gap-20'>
      <div>
        <p className='font-extrabold text-3xl capitalize'>Article @</p>
        {props.articles?.length <= 0 ? (
          <p className=' ml-2 mt-2 font-light'>No article added yet.</p>
        ) : (
          <React.Fragment>
            <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-2'>
              {props.articles?.map((project, index) => (
                <ArticleCard data={project} key={index} />
              ))}
            </ul>

            <Link href='/articles'>
              <span className='float-right text-2xl font-bold  inline-flex items-center group'>
                <span className='group-hover:text-rose-600'>
                  View all Articles
                </span>
                <MdArrowForward className='group-hover:ml-2 transition-all duration-500 group-hover:text-rose-600' />
              </span>
            </Link>
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
