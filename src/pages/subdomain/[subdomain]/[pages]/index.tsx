import { useRouter } from 'next/router';
import ShopPageTemp from '@/template/shop';
import AboutPageTemp from '@/template/about';
import ResumePageTemp from '@/template/resume';
import ContactPageTemp from '@/template/contact';
import ArticlesPageTemp from '@/template/articles';
import ProjectsPageTemp from '@/template/projects';
import { AboutMe, ArticleResponse, ProjectResponse } from '@/interface';
import { getUsersArticles } from '@/utils/outerbase-req/articles';
import { getUsersProjects } from '@/utils/outerbase-req/projects';
import { findUserByUsername, getAllUsername } from '@/utils/outerbase-req/users';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';
import { getAboutMeByUserId } from '@/utils/outerbase-req/about';
import StateLoader from '@/components/global/loader';
import { getContent } from '@/utils/outerbase-req/resume';
import { OutputData } from '@editorjs/editorjs';

export default function Index(props: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <main className='w-full h-full flex items-center justify-center gap-2'>
        <StateLoader styles='text-2xl' />
        <p className='text-xl'>Loading...</p>
      </main>
    );
  }

  switch (props.pages) {
    case 'about':
      return <AboutPageTemp aboutData={props.aboutMe} />;

    case 'projects':
      return <ProjectsPageTemp projects={props.projects} />;

    case 'articles':
      return <ArticlesPageTemp articles={props.articles} />;

    case 'resume':
      return <ResumePageTemp resumeData={props.resumeData} />;

    case 'contact':
      return <ContactPageTemp />;
    
    
    case 'shop':
      return <ShopPageTemp />;

    default:
      return (
        <main>
        <p>Hello World</p>
        </main>
      );
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const subdomains = await getAllUsername(); 
  const pages = [
    { page: 'about' },
    { page: 'contact' },
    { page: 'resume' },
    { page: 'articles' },
    { page: 'projects' },
    { page: 'shop' },
  ];

  const paths = subdomains.flatMap((subdomain) =>
    pages.map((page) => ({
      params: {
        subdomain: subdomain.username.toLowerCase(),
        pages: page.page,
      },
    }))
  );

  return {
    paths,
    fallback: false, 
  };
};

export const getStaticProps: GetStaticProps<{
  aboutMe: AboutMe;
  articles: ArticleResponse;
  projects: ProjectResponse;
  subdomain: string;
  pages: string;
  resumeData: OutputData;
}> = async (context) => {
  const { params } = context;
  if (
    !params ||
    typeof params.subdomain !== 'string' ||
    typeof params.pages !== 'string'
  ) {
    return { notFound: true };
  }
  const { subdomain, pages } = params;
  const user = await findUserByUsername(subdomain);
  const articles = await getUsersArticles(user.id);
  const projects = await getUsersProjects(user.id);
  const aboutMe = await getAboutMeByUserId(user.id);
  const resumeData = await getContent(user.id);
  if (!articles || !projects || !aboutMe || !resumeData) {
    return { notFound: true };
  }
  return {
    props: JSON.parse(
      JSON.stringify({
        articles,
        projects,
        pages,
        subdomain,
        aboutMe,
        resumeData,
      })
    ),
    revalidate: 1,
  };
};