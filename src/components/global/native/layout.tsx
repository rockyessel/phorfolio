import React from 'react';
import { LayoutProps } from '@/interface';
import Header from '@/components/global/native/head';

const Layout = (props: LayoutProps) => {
  return (
    <React.Fragment>
      <Header
        description={props?.description}
        title={props?.title}
        image={props?.image}
        type={props?.type}
        alt={props?.alt}
        keywords={props?.keywords}
        publishedAt={props?.publishedAt}
        updatedAt={props?.updatedAt}
        MIME={props?.MIME}
        author_name={props?.author_name}
      />

      {props.children}
    </React.Fragment>
  );
};

export default Layout;
