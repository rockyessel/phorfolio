import React from 'react';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/dashboard/layout/navbar';
import Footer from '@/components/global/native/footer';

export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <React.Fragment>
      <SessionProvider session={session}>
        <Navbar />
        <NextNProgress color={'#ff5277'} />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </React.Fragment>
  );
}
