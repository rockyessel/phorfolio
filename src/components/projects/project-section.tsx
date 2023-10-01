import React from 'react';
import Link from 'next/link';
import ProjectCard from './card';
import { ProjectItem } from '@/interface';
import { MdArrowForward } from 'react-icons/md';

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
          <p className=' ml-2 mt-2 font-light'>
            No side-project has been added yet.
          </p>
        ) : (
          <React.Fragment>
            <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-2'>
              {props.sideProjects?.map((project, index) => (
                <ProjectCard data={project} key={index} />
              ))}
            </ul>

            <Link href='/projects'>
              <span className='float-right text-2xl font-bold  inline-flex items-center group'>
                <span className='group-hover:text-rose-600'>
                  View all Projects
                </span>
                <MdArrowForward className='group-hover:ml-2 transition-all duration-500 group-hover:text-rose-600' />
              </span>
            </Link>
          </React.Fragment>
        )}
      </div>
      
    </section>
  );
};

export default ProjectSection;
