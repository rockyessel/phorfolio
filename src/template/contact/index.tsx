import React from 'react';
import Form from '@/components/contact/form';
import TemplateLayout from '@/components/template/layout';
import { User } from '@/interface';
import useSubdomain from '@/hooks/subdomain';
import { findUserByUsername } from '@/utils/outerbase-req/users';

interface Props {}

const ContactPageTemp = () => {
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
      <section className='flex flex-col gap-10'>
        <p className='font-bold text-xl md:text-7xl capitalize'>Contact</p>

        <p className='text-lg md:text-2xl font-light'>
          Send a general message or details of a project you&apos;d like me to
          be a part of and I&apos;ll get back to you as soon as possible.
        </p>

        <Form />
      </section>
    </TemplateLayout>
  );
};

export default ContactPageTemp;
