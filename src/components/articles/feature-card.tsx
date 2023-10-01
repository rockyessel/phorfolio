import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GoLink } from 'react-icons/go';

const ProjectFeatureCard = () => {
  return (
    <section className='flex items-center gap-1 p-1 ring-2 ring-rose-700 ring-opacity-50 hover:ring-4 hover:ring-rose-500 w-fit rounded-lg'>
      <div className='border-[1px] w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500 flex gap-2'>
        <Image
          width={1000}
          height={1000}
          title='React.JS'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
          className='h-auto object-cover object-center w-20 border-rose-400 border-[1px] border-opacity-70 p-1 rounded-lg'
          alt=''
        />
        <div>
          <p className='font-bold text-lg'>Klaudbox</p>
          <p className='text-gray-300'>
            This is Klaudbox project is a platform that handlers users files,
            store them in a secure space, and it is only available by the users
            code.
          </p>
        </div>
        <Link
          href='/projects/'
          className='p-1 rounded-lg hover:border-rose-700 hover:border-opacity-60 hover:border-[1px] h-fit w-fit'
        >
          <GoLink />
        </Link>
      </div>
    </section>
  );
};

export default ProjectFeatureCard;
