import { UserData } from '@/interface';
import { getUserBySubdomain, userStaticPaths } from '@/lib/users';
import { useRouter } from 'next/router';

export async function getStaticPaths() {
  const paths = await userStaticPaths();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: {
  params: { subdomain: string };
}) {
  const user = await getUserBySubdomain(context.params.subdomain);
  return {
    props: user,
    revalidate: 3600,
  };
}

function AboutPage(props: UserData) {
  const router = useRouter();
  const { subdomain } = router.query;

  return (
    <main className='prose'>
      <h1>About {props.name}</h1>
    </main>
  );
}

export default AboutPage;
