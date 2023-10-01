import React from 'react';
import { Params } from '@/interface';
import AuthUI from '@/components/auth/ui';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next';

const AuthenticationPage = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'authenticated') router.push('/dashboard');
  }, [router, status]);

  return <AuthUI type={props.auth} />;
};

export default AuthenticationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const authPaths = ['register', 'login'].map((auth) => ({ params: { auth } }));
  return { paths: authPaths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ auth: string }> = async (
  context
) => {
  const { auth }: any = context.params as Params;
  return {
    props: {
      auth,
    },
  };
};
