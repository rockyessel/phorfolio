import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
  styles?:string
}

const DashboardLayout = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/a/login');
    }
  }, [router, status]);

  return (
    <main className='w-full h-screen overflow-y-hidden'>
      <Navbar />
      <section className='w-full flex'>
        <Sidebar />
        <section className={`${props.styles ? props.styles: 'relative w-full h-[90vh] overwrite-sticky flex-1'}`}>
          {props.children}
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
