import { ProjectResponse } from '@/interface';
import React from 'react';
import ProjectCard from '@/components/projects/card';
import Layout from '@/components/global/native/layout';

interface Props {
  projects: ProjectResponse
}

const ProjectsPageTemp = (props: Props) => {
  return (
    <Layout description={''} title={''} image={''} type={''} alt={''} keywords={''} publishedAt={''} updatedAt={''} MIME={''} author_name={''}>
      <main className='w-full h-full flex flex-col gap-10 px-4 lg:px-14 xl:px-20 2xl:px-40 py-2  pb-5 mt-5 md:mt-28'>
        <div>
          <p className='font-bold text-5xl md:text-7xl capitalize'>
            Just saying...
          </p>
          <p className=' text-lg md:text-2xl font-light'>
            Nice to meet you again! These are all the projects that was designed
            and developed by me. Check them out and let me know what you think.
          </p>
        </div>
        <ul className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2.5`}>
          {props.projects?.response?.items?.map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default ProjectsPageTemp;
