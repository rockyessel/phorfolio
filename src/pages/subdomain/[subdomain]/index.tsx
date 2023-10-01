import { useRouter } from 'next/router';
import { ApiResponse, ArticleResponse, HomeContent, ProjectResponse, UserData } from '@/interface';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { defaultMetaData } from '@/utils/constants/native/head';
import Layout from '@/components/global/native/layout';
import Hero from '@/components/global/native/hero';
import ProjectSection from '@/components/projects/project-section';
import ContactSection from '@/components/global/contact-section';
import {
  getHomeContentByUserId,
} from '@/utils/outerbase-req/components';
import { findUserByUsername, userStaticPaths } from '@/utils/outerbase-req/users';
import { getUsersArticles } from '@/utils/outerbase-req/articles';
import { getUsersProjects } from '@/utils/outerbase-req/projects';
import ArticleSection from '@/components/articles/article-section';
import ShopSection from '@/components/shop/shop-section';

const Homepage = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <Layout {...defaultMetaData}>
      <main className='w-full h-full flex flex-col gap-20 px-4 lg:px-14 xl:px-20 2xl:px-40 pb-5'>
        <Hero data={props?.homeContent} />
        <ProjectSection
          sideProjects={props.projects.response?.items}
          professionalProjects={props.projects.response?.items}
        />
        <ArticleSection articles={props.articles.response.items} />
        <ShopSection />
        <ContactSection
          footerDescription={props.homeContent.footer_description}
        />

      </main>
    </Layout>
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

export const getStaticProps: GetStaticProps<{ homeContent: HomeContent; articles: ArticleResponse; projects:ProjectResponse }> = async (context) => {
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
