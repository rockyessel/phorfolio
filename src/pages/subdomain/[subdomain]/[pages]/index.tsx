// pages/subdomain/[subdomain]/[pages]/index.tsx


import { useRouter } from 'next/router';
import { UserData } from '@/interface';
import {
  getUserBySubdomain,
  userStaticPaths,
  userStaticPathsSubdomain,
} from '@/lib/users';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Index(props: { user: UserData; subdomain: string, pages:string }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  console.log('Subdomain', props.subdomain);

  switch (props.pages) {
    case 'about':
      return (
        <main className='prose'>
          <h1>About {props.user.name}</h1>
        </main>
      );

    case 'contact':
      return (
        <main className='prose'>
          <h1>Contact me @: {props.user.email}</h1>
        </main>
      );

    default:
      return (
        <main>
          <h1>User {props?.user.name}</h1>
          <p>Company: {props?.user.company?.name}</p>
          <p className='inline-flex flex-col gap-1'>
            Address:
            <span>City: {props?.user.address?.city}</span>
            <span>Street: {props?.user.address?.street}</span>
          </p>
        </main>
      );
  }
}

// Getting the paths for all the subdomains in our database
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of subdomains
  const subdomains = await userStaticPathsSubdomain(); // Replace with your actual data-fetching function

  // Define the list of pages within each subdomain
  const pages = [
    {
      page: 'about',
    },
    {
      page: 'contact',
    },
    // Add more pages as needed
  ];

  // Generate dynamic paths for subdomains and their pages
  const paths = subdomains.flatMap((subdomain) =>
    pages.map((page) => ({
      params: {
        subdomain: subdomain.username.toLowerCase(),
        pages: page.page,
      },
    }))
  );


  // console.log('paths: ', paths);
  return {
    paths,
    fallback: false, // or true if you want to handle unknown pages
  };
};

// Getting data to display on each custom subdomain
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { subdomain, pages } = params! as { subdomain: string; pages: string };
  const user = await getUserBySubdomain(subdomain);
  console.log('Subdomain: ', subdomain);
  return {
    props: { user, subdomain, pages },
    revalidate: 3600,
  };
};
