import React from 'react';
import { CommonPath } from '@/interface';
import EditArticlePage from '../../../../../components/dashboard/edit/[e]/[slug]/article';
import EditProjectPage from '../../../../../components/dashboard/edit/[e]/[slug]/project';
import { getAllProjectSlugs } from '@/utils/outerbase-req/projects';
import { getAllArticlesSlugs } from '@/utils/outerbase-req/articles';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';

const EditContentPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading..</p>;
  }

  if (props.e === 'projects') {
    return (
      <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
        <EditProjectPage slug={props.slug} e={props.e} />
      </main>
    );
  } else if (props.e === 'articles') {
    return (
      <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
        <EditArticlePage slug={props.slug} e={props.e} />
      </main>
    );
  }
  // switch (props.e) {
  //   case 'projects':
  //     return (
  //       <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
  //         <EditProjectPage slug={props.slug} e={props.e} />;
  //       </main>
  //     );

  //   case 'articles':
  //     return (
  //       <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
  //         <EditArticlePage slug={props.slug} e={props.e} />
  //       </main>
  //     );

  //   default:
  //     return (
  //       <main className='relative w-full h-screen overflow-y-auto flex flex-col'>
  //         <EditProjectPage slug={props.slug} e={props.e} />;
  //       </main>
  //     );
  // }
};

export default EditContentPage;

export const getStaticPaths: GetStaticPaths<{
  e: string;
  slug: string;
}> = async () => {
  const articleSlugs: CommonPath = await getAllArticlesSlugs();
  const projectSlugs: CommonPath = await getAllProjectSlugs();

  const paths = [
    ...articleSlugs?.response?.items?.map((slug) => ({
      params: { e: 'articles', slug: slug.slug },
    })),
    ...projectSlugs?.response?.items?.map((slug) => ({
      params: { e: 'projects', slug: slug.slug },
    })),
  ];

  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps<{ e: string; slug: string }> = async (context) => {
  const { e, slug } = context.params || { e: '', slug: '' };

  if (typeof e === 'string' && typeof slug === 'string') {
    // Check if e is 'articles' or 'projects' (or any other valid values)
    if (e === 'articles' || e === 'projects') {
      return {
        props: {
          e,
          slug,
        },
      };
    }
  }

  // Return a notFound result if the conditions are not met
  return {
    notFound: true,
  };
};