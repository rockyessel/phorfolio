import React from 'react';
import { OutputData } from '@editorjs/editorjs';
import EditorOutput from '@/components/EditorOutput';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import { getContent } from '@/utils/outerbase-req/resume';

const ResumePageTemp = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  if (!props?.resumeData) {
    return <p>Loading...</p>; // Add a loading indicator or handle the absence of data gracefully
  }

  return (
    <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 pb-5 mt-5 md:mt-28 prose-2xl prose-headings:text-rose-800 prose-p:text-white prose-gray'>
      <EditorOutput content={props?.resumeData} />
    </main>
  );
};

export default ResumePageTemp;
export const getStaticProps: GetStaticProps<{resumeData: OutputData | undefined}> = async () => {
  const resumeData = await getContent();
  // if (!resumeData) return { notFound: true };
  return {
    props: JSON.parse(JSON.stringify({ resumeData })),
    revalidate: 1,
  };
};
