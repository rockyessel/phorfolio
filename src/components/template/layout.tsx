import React from 'react';

import Footer from '@/components/global/native/footer';
import Navbar from '@/components/global/native/navbar';
import Layout from '../global/native/layout';

interface Props {
  children: React.ReactNode;
  description: string;
  title: string;
  image: string;
  type: string;
  alt: string;
  keywords: string;
  publishedAt: string;
  updatedAt: string;
  MIME: string;
  author_name: string;
}

const TemplateLayout = (props: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Layout
        description={props.description}
        title={props.title}
        image={props.image}
        type={props.type}
        alt={props.alt}
        keywords={props.keywords}
        publishedAt={props.publishedAt}
        updatedAt={props.updatedAt}
        MIME={props.MIME}
        author_name={props.author_name}
      >
        <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 pb-5 mt-5 md:mt-28'>
          {props.children}
        </main>
      </Layout>
      <Footer />
    </React.Fragment>
  );
};

export default TemplateLayout;
