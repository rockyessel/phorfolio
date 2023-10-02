import { ProjectResponse, User } from '@/interface';
import React from 'react';
import ProjectCard from '@/components/projects/card';
import Layout from '@/components/global/native/layout';
import TemplateLayout from '@/components/template/layout';
import useSubdomain from '@/hooks/subdomain';
import { findUserByUsername } from '@/utils/outerbase-req/users';

interface Props {
  projects: ProjectResponse;
}

const ProjectsPageTemp = (props: Props) => {
  const [user, setUser] = React.useState<User>();
  const subdomain = useSubdomain(0);

  React.useEffect(() => {
    if (subdomain) {
      findUserByUsername(subdomain).then((user) => setUser(user));
    }
  }, [subdomain]);

  return (
    <TemplateLayout
      description={''}
      title={`${user?.name}'s Articles`}
      image={`${user && user.image}`}
      type={`Articles - ${user?.name}`}
      alt={`${user?.username}`}
      keywords={''}
      publishedAt={new Date().toISOString()}
      updatedAt={new Date().toISOString()}
      MIME={`${user && user.image.split('.').pop()}`}
      author_name={`${user?.name}`}
    >
      <div>
        <p className='font-bold text-5xl md:text-7xl capitalize'>
          Just saying...
        </p>
        <p className=' text-lg md:text-2xl font-light'>
          Nice to meet you again! These are all the projects that was designed
          and developed by me. Check them out and let me know what you think.
        </p>
      </div>
      <ul
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2.5`}
      >
        {props.projects?.response?.items?.map((project, index) => (
          <ProjectCard key={index} data={project} />
        ))}
      </ul>
    </TemplateLayout>
  );
};

export default ProjectsPageTemp;
