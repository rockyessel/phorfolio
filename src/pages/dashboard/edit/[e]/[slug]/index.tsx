import React from 'react'
import { CommonPath } from '@/interface';
import EditArticlePage from '@/components/dashboard/edit/article';
import EditProjectPage from '@/components/dashboard/edit/project';
import { getAllProjectSlugs } from '@/utils/outerbase-req/projects';
import { getAllArticlesSlugs } from '@/utils/outerbase-req/articles';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';

const EditContentPage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  switch (props.e) {
    case 'articles':
      return <EditArticlePage slug={props.slug} e={props.e} />
    case 'projects':
      return <EditProjectPage slug={props.slug} e={props.e} />;
      default:
      return <EditProjectPage slug={props.slug} e={props.e} />;
  }
};

export default EditContentPage;

export const getStaticPaths: GetStaticPaths<{ e: string; slug: string }> = async () => {
  const articleSlugs: CommonPath = await getAllArticlesSlugs();
  const projectSlugs: CommonPath = await getAllProjectSlugs();

  const paths = [
    ...articleSlugs?.response?.items?.map((slug) => ({ params: { e: 'articles', slug: slug.slug } })),
    ...projectSlugs?.response?.items?.map((slug) => ({ params: { e: 'projects', slug: slug.slug } }))
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ e: string; slug: string }> = async (context) => {
  // @ts-ignore
  const { e, slug }: { e: string; slug: string } = context.params || { e: '', slug: '' };
  if (e === 'articles' || e === 'projects' || e === 'shop') {
    return {
      props: {
        e,
        slug,  
      },
    };
  }

  return {
    notFound: true,
  };
  }