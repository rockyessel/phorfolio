import Layout from '@/components/global/native/layout';
import { defaultMetaData } from '@/utils/constants/native/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <Layout {...defaultMetaData}>
      <main className=' relative w-full flex flex-col items-center justify-center text-center'>
        <h1 className='lg:text-6xl md:text-5xl sm:text-4xl text-3xl lg:leading-[70px] font-bold mt-16 mb-6'>
          Get Your Professional Portfolio Website
          <span className=' text-rose-600'>Now</span>!
        </h1>
        <p className='text-slate-400 lg:max-w-5xl'>
          Are you an aspiring developer seeking to enhance your online presence?
          Our platform offers a simple solution to kickstart your tech journey.
          Obtain a polished and professional portfolio website, even without
          prior design experience. With our platform, you can showcase your
          work, skills, and accomplishments effectively. Make a lasting
          impression on potential employers, clients, and peers.
        </p>
        <div className=' md:mt-16 sm:mt-12 mt-10 flex items-center md:space-x-6 space-x-4'>
          <Link
            className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            href='/explore'
          >
            Meet
          </Link>
          <Link
            className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            href='/explore'
          >
            Explore
          </Link>
        </div>
      </main>
    </Layout>
  );
}
