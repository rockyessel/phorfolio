import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';

interface Props {
  pageNumberLimit: number | undefined;
  totalPageNumber: number | undefined;
  handlePagination: (type: 'next' | 'previous') => void;
}

const PaginateButton = (props: Props) => {
  return (
    <div className='flex items-center mt-4 gap-x-4 sm:mt-0'>
      <button
        type='button'
        title='Previous'
        onClick={() => props.handlePagination('previous')}
        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700   ${
          props.pageNumberLimit === 1 ? 'cursor-not-allowed' : ''
        }`}
      >
        <MdArrowBack />
        <span>previous</span>
      </button>

      <button
        type='button'
        title='Next'
        onClick={() => props.handlePagination('next')}
        className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700 ${
          props.pageNumberLimit === props.totalPageNumber!
            ? 'cursor-not-allowed'
            : ''
        }`}
      >
        <span>Next</span>
        <IoMdArrowForward />
      </button>
    </div>
  );
};

export default PaginateButton;
