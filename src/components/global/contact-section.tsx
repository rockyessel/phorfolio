import React from 'react';
import FollowButton from './follow-btn';
import Link from 'next/link';
import { WebDeveloper } from '@/interface';

interface Props {
  data: WebDeveloper;
}

const ContactSection = (props: Props) => {
  const socialObj = {
    github: props.data?.github,
    linkedin: props.data?.linkedin,
    x: props.data?.x,
  };
  return (
    <section className='flex flex-col gap-2'>
      <p className='font-extrabold text-3xl capitalize'>Get In touch</p>
      <p className=' text-lg md:text-2xl font-light'>
        Although I&apos;m currently looking for any new opportunities, my inbox
        is always open. Whether you have a question or just want to say hi,
        I&apos;ll try my best to get back to you!
      </p>

      <div className='flex items-center gap-3 md:gap-5md:text-3xl text-2xl'>
        <FollowButton data={socialObj} />
        <Link href='/contact'>
          <button
            title='Contact me'
            type='button'
            className=' hover:scale-[1.1] md:ml-6 origin-center hover:origin-top transition-all duration-500 after:hover:re_li w-fit font-bold relative text-decoration-none after:content-[""] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-2 after:bg-rose-500'
          >
            Contact me
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
