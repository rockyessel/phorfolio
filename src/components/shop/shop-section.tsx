import Link from 'next/link';
import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import OnlineShopCard from './card';

const ShopSection = (props: any) => {
  return (
    <section className='flex flex-col gap-20'>
      <div>
        <p className='font-extrabold text-3xl capitalize'>My Shop🛒</p>
        {props.articles?.length <= 0 ? (
          <p className=' ml-2 mt-2 font-light'>No article added yet.</p>
        ) : (
          <React.Fragment>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-2'>
              <OnlineShopCard />
              <OnlineShopCard />
              <OnlineShopCard />
              <OnlineShopCard />
              <OnlineShopCard />
              <OnlineShopCard />
            </ul>
            <Link href='/shop'>
              <span className='float-right text-2xl font-bold  inline-flex items-center group'>
                <span className='group-hover:text-rose-600'>
                  View all Items
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

export default ShopSection;
