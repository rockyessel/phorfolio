import { useRouter } from 'next/router';
import { UserData } from '@/interface';
import { getUserBySubdomain, userStaticPaths } from '@/lib/users';

export default function Index(props: UserData) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  console.log('Subdomain', props);

  return (
    <main>
      <h1>User {props?.name}</h1>
      <p>Company: {props?.company?.name}</p>
      <p className='inline-flex flex-col gap-1'>
        Address:
        <span>City: {props?.address?.city}</span>
        <span>Street: {props?.address?.street}</span>
      </p>
    </main>
  );
}

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
  return {
    props: user,
    revalidate: 3600,
  };
}
