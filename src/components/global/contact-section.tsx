import React from 'react';
import Link from 'next/link';

interface Props {
  footerDescription: string;
}

const ContactSection = (props: Props) => {
  return (
    <section className='flex flex-col gap-2'>
      <p className='font-extrabold text-3xl capitalize'>Get In touch</p>
      <p className=' text-lg md:text-2xl font-light'>
        {props.footerDescription}
      </p>
      <div className='flex items-center gap-3 md:gap-5md:text-3xl text-2xl'>
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
