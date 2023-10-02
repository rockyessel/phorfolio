import React from 'react';
import { ArticleResponse, User } from '@/interface';
import ArticleCard from '@/components/articles/card';
import useSubdomain from '@/hooks/subdomain';
import { findUserByUsername } from '@/utils/outerbase-req/users';
import TemplateLayout from '@/components/template/layout';

interface Props {
  articles: ArticleResponse;
}

const ArticlesPageTemp = (props: Props) => {
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
          Information to share
        </p>
        <p className=' text-lg md:text-2xl font-light'>
          As a developer, I love sharing breakthroughs and insights to help
          fellow web developers. All the information I share here is thoroughly
          researched and references are provided for further exploration.{' '}
          <span className='underline'>Sharing is caring</span>
        </p>
      </div>

      <ul className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-2.5 overflow-hidden'>
        {props.articles?.response?.items?.map((article, index) => (
          <ArticleCard key={index} data={article} />
        ))}
      </ul>
    </TemplateLayout>
  );
};

export default ArticlesPageTemp;
