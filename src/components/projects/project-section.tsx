import { ProjectItem } from '@/interface';
import React from 'react';
import ProjectCard from './card';

interface Props {
  sideProjects: ProjectItem[];
  professionalProjects: ProjectItem[];
}

const ProjectSection = (props: Props) => {
  return (
    <section className='flex flex-col gap-20'>
      <div>
        <p className='font-extrabold text-3xl capitalize'>
          Professional Projects
        </p>
        {props.professionalProjects?.length <= 0 ? (
          <p className=' ml-2 mt-2 font-light'>
            No professional project has been added yet.
          </p>
        ) : (
          <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-2'>
            {props.professionalProjects?.map((project, index) => (
              <ProjectCard data={project} key={index} />
            ))}
          </ul>
        )}
      </div>
      <div>
        <p className='font-extrabold text-3xl capitalize'>Side Projects</p>
        {props.sideProjects?.length <= 0 ? (
          <p className=' ml-2 mt-2 font-light'>No side-project has been added yet.</p>
        ) : (
          <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-2'>
            {props.sideProjects?.map((project, index) => (
              <ProjectCard data={project} key={index} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
