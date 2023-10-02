import React from 'react';
import '@/styles/globals.scss';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/global/native/footer';
import Navbar from '@/components/global/native/navbar';
import Chat from '@/components/global/chat';
import useSubdomain from '@/hooks/subdomain';

export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  const subdomain = useSubdomain(0)
  const router = useRouter();
  const isDashboardRoute = router.pathname.includes('dashboard');
  return (
    <React.Fragment>
      <SessionProvider session={session}>
        <NextNProgress color={'#ff5277'} />
        <Component {...pageProps} />
        <ToastContainer />
        {!isDashboardRoute && typeof subdomain === 'string' &&  <Chat />}
      </SessionProvider>
    </React.Fragment>
  );
}
