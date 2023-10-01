import React from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import ImageSliderCard from './image-slider';
import Link from 'next/link';
const images = [
  'https://img.freepik.com/free-vector/cute-girl-working-laptop-with-coffee-cup-illustration_138676-2398.jpg',
  'https://img.freepik.com/free-vector/happy-man-working-laptop-cartoon-character-people-technology-isolated_138676-3151.jpg',
  'https://img.freepik.com/premium-vector/boy-working-laptop-with-coffee-illustration-cactus-flower-flat-cartoon-style_586360-362.jpg',
  'https://img.freepik.com/free-vector/cute-man-working-computer-with-coffee-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3868.jpg',
];

const OnlineShopCard = () => {
  return (
    <li className='group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-rose-600 bg-[#131b24] shadow-md'>
      <Link className='relative flex h-60 overflow-hidden' href='#'>
        <ImageSliderCard images={images} />
        <div className='absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0'>
          <button
            title='Cart'
            type='button'
            className='flex h-10 w-10 items-center justify-center bg-rose-900 text-white transition hover:bg-rose-700'
          >
            <BsFillCartFill />
          </button>
        </div>
      </Link>
      <main className='mt-4 px-5 pb-5'>
        <Link href='#'>
          <h5 className='text-xl tracking-tight text-gray-300'>
            Lululemon Comfort Tee - White
          </h5>
        </Link>
        <div className='mt-2 mb-5 flex items-center justify-between'>
          <p>
            <span className='text-3xl font-bold text-gray-300'>$79</span>
            <span className='text-sm text-gray-300 line-through'>$99</span>
          </p>
        </div>
        <button
          className='flex items-center justify-center bg-rose-900 px-2 py-1 text-sm text-white transition hover:bg-rose-700'
        >
          <BsFillCartFill />
          Add to cart
        </button>
      </main>
    </li>
  );
};

export default OnlineShopCard;
