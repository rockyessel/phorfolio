import { useRouter } from 'next/router';
import { ApiResponse, ProjectResponse, UserData } from '@/interface';
import { getUserBySubdomain, userStaticPaths } from '@/lib/users';
import { InferGetServerSidePropsType } from 'next';
import { defaultMetaData } from '@/utils/constants/native/head';
import Layout from '@/components/global/native/layout';
import Hero from '@/components/global/native/hero';
import ProjectSection from '@/components/projects/project-section';
import ContactSection from '@/components/global/contact-section';
import {
  getAllProfessionalProjects,
  getAllSideProjects,
  getMainContentHero,
} from '@/utils/outerbase-req/components';

const Homepage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
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
        <Hero data={props?.main_content_hero?.response?.items[0]} />
        <ProjectSection
          sideProjects={props.sideProjects?.response?.items}
          professionalProjects={props.professionalProjects?.response?.items}
        />
        <ContactSection data={props?.main_content_hero?.response?.items[0]} />
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

// Getting data to display on each custom subdomain
export async function getStaticProps(context: {
  params: { subdomain: string };
}) {
  const user = await getUserBySubdomain(context.params.subdomain);
  console.log('Subdomain: ', context.params.subdomain);
  const main_content_hero: ApiResponse = await getMainContentHero();
  const sideProjects: ProjectResponse = await getAllSideProjects();
  const professionalProjects: ProjectResponse =
    await getAllProfessionalProjects();
  if (!main_content_hero || !sideProjects || !professionalProjects)
    return { notFound: true };
  return {
    props: JSON.parse(
      JSON.stringify({ main_content_hero, sideProjects, professionalProjects })
    ),
  };
}
{
  /*


import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAllProfessionalProjects, getAllSideProjects, getMainContentHero } from '@/utils/api-request';
import { ApiResponse, ProjectResponse } from '@/interface';
import { defaultMetaData } from '@/utils/services';
import ContactSection from '@/components/global/contact-section';
import ProjectSection from '@/components/projects/project-section';
import Hero from '@/components/global/native/hero';
import Layout from '@/components/global/native/layout';

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(props)
  return (
    <Layout {...defaultMetaData}>
      <main className='w-full h-full flex flex-col gap-20 px-4 lg:px-14 xl:px-20 2xl:px-40 pb-5'>
        <Hero data={props?.main_content_hero?.response?.items[0]} />
        <ProjectSection sideProjects={props.sideProjects?.response?.items} professionalProjects={props.professionalProjects?.response?.items} />
        <ContactSection data={props?.main_content_hero?.response?.items[0]} />
      </main>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{ main_content_hero: ApiResponse, sideProjects: ProjectResponse, professionalProjects: ProjectResponse }> = async () => {
  const main_content_hero: ApiResponse = await getMainContentHero();
  const sideProjects: ProjectResponse = await getAllSideProjects();
  const professionalProjects: ProjectResponse = await getAllProfessionalProjects();
  if (!main_content_hero || !sideProjects || !professionalProjects)
    return { notFound: true };
  return {
    props: JSON.parse(
      JSON.stringify({ main_content_hero, sideProjects, professionalProjects })
    ),
  };
};

*/
}
