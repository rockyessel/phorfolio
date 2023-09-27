import React from 'react';

interface Props {
    totalItemLength: number | undefined
    title:string
}

const ItemsHeader = (props: Props) => {
  return (
    <div className='flex items-center gap-x-3'>
      <p className='text-lg font-medium'>{props.title}</p>
      <span className='px-3 py-1 text-xs bg-rose-700 rounded-full'>
        {props.totalItemLength} lists
      </span>
    </div>
  );
};

export default ItemsHeader;
