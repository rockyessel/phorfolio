import { useRouter } from 'next/router';
import {
  ArticleResponse,
  HomeContent,
  ProjectResponse,
} from '@/interface';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { defaultMetaData } from '@/utils/constants/native/head';
import Hero from '@/components/global/native/hero';
import ProjectSection from '@/components/projects/project-section';
import { getHomeContentByUserId } from '@/utils/outerbase-req/components';
import {
  findUserByUsername,
  userStaticPaths,
} from '@/utils/outerbase-req/users';
import { getUsersArticles } from '@/utils/outerbase-req/articles';
import { getUsersProjects } from '@/utils/outerbase-req/projects';
import ArticleSection from '@/components/articles/article-section';
import ShopSection from '@/components/shop/shop-section';
import TemplateLayout from '@/components/template/layout';
import StateLoader from '@/components/global/loader';

const Homepage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <main className='w-full h-full flex items-center justify-center gap-2'>
        <StateLoader styles='text-2xl' />
        <p className='text-xl'>Loading...</p>
      </main>
    );
  }

  return (
    <TemplateLayout {...defaultMetaData}>
      <Hero data={props?.homeContent} />
      <ProjectSection
        sideProjects={props.projects.response?.items}
        professionalProjects={props.projects.response?.items}
      />
      <ArticleSection articles={props.articles.response.items} />
      <ShopSection />
    </TemplateLayout>
  );
};

export default Homepage;

// Getting the paths for all the subdomains in our database
export async function getStaticPaths() {
  const paths = await userStaticPaths();

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<{
  homeContent: HomeContent;
  articles: ArticleResponse;
  projects: ProjectResponse;
}> = async (context) => {
  const { params } = context;
  if (!params || typeof params.subdomain !== 'string') {
    return { notFound: true };
  }

  const { subdomain } = params;
  const user = await findUserByUsername(subdomain);
  const homeContent = await getHomeContentByUserId(user.id);
  const articles = await getUsersArticles(user.id);
  const projects = await getUsersProjects(user.id);

  if (!homeContent || !articles || !projects) {
    return { notFound: true };
  }

  return {
    props: JSON.parse(JSON.stringify({ homeContent, articles, projects })),
    revalidate: 1,
  };
};
