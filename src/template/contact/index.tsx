import React from 'react';
import Form from '@/components/contact/form';

interface Props {}

const ContactPageTemp = () => {
  return (
    <main className='px-4 lg:px-14 xl:px-20 2xl:px-40 py-2 mt-20'>
      <section className='flex flex-col gap-10'>
        <p className='font-bold text-5xl md:text-7xl capitalize'>
          Reach out to me
        </p>

        <p className='text-lg md:text-2xl font-light'>
          Send a general message or details of a project you&apos;d like me to
          be a part of and I&apos;ll get back to you as soon as possible.
        </p>

        <Form />
      </section>
    </main>
  );
};

export default ContactPageTemp;
