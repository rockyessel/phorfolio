import { GetStaticPaths, GetStaticProps } from 'next';
import { userStaticPathsSubdomain, getUserBySubdomain } from '@/lib/users';
import { UserData } from '@/interface';

export default function DetailedPage(props: {
  user: UserData;
  subdomain: string;
  pages: string;
}) {
  // Your component code here
}

// Getting the paths for all the subdomains, pages, and slugs in our database
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of subdomains
  const subdomains = await userStaticPathsSubdomain(); // Replace with your actual data-fetching function

  // Define the list of pages within each subdomain
  const pages = [
    {
      page: 'articles',
    },
    {
      page: 'projects',
    },
    // Add more pages as needed
  ];

  const slugs = [
    {
      slug: 'hello-word',
    },
  ];

  // Generate dynamic paths for subdomains, pages, and slugs
  const paths = subdomains.flatMap((subdomain) =>
    pages.flatMap((page) =>
      slugs.map((slug) => ({
        params: {
          subdomain: subdomain.username.toLowerCase(),
          pages: page.page,
          slug: slug.slug,
        },
      }))
    )
  );

  console.log('paths: ', paths);

  return {
    paths,
    fallback: false, // or true if you want to handle unknown pages
  };
};

// Getting data to display on each custom subdomain, page, and slug
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { subdomain, pages, slug } = params! as {
    subdomain: string;
    pages: string;
    slug: string;
  };
  const user = await getUserBySubdomain(subdomain);
  console.log('Subdomain: ', subdomain);
  return {
    props: { user, subdomain, pages, slug },
    revalidate: 3600,
  };
};
