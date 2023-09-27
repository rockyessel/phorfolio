import React from 'react'
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { ArticleResponse } from '@/interface';
import ArticleCard from '@/components/articles/card';
import { getAllArticles } from '@/utils/outerbase-req/articles';

interface Props {}

const ArticlesPageTemp = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 pb-5 mt-5 md:mt-28'>
      <div>
        <p className='font-bold text-5xl md:text-7xl capitalize'>
          Information to share
        </p>
        <p className=' text-lg md:text-2xl font-light'>
          As a developer, I love sharing breakthroughs and insights to help
          fellow web developers. All the information I share here is thoroughly
          researched and references are provided for further exploration.{' '}
          <span className='underline'>Sharing is caring</span>
        </p>
      </div>

      <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2.5 overflow-hidden'>
        {props.articles?.response?.items?.map((article, index) => (
          <ArticleCard key={index} data={article} />
        ))}
      </ul>
    </main>
  );
}

export default ArticlesPageTemp

export const getStaticProps: GetStaticProps<{ articles: ArticleResponse | undefined }> = async () => {
  const articles: ArticleResponse = await getAllArticles();
  return { props: JSON.parse(JSON.stringify({ articles })), revalidate: 1 };
};
