import React from 'react';

interface Props {
  totalPagerNumber: number | undefined;
  currentPageNumber: number;
}

const CurrentPageInfo = (props: Props) => {
  return (
    <div className='text-sm'>
      Page{' '}
      <span className='font-medium text-gray-200'>
        {props.currentPageNumber} of {props.totalPagerNumber}
      </span>
    </div>
  );
};

export default CurrentPageInfo;
