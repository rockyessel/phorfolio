import React from 'react';
import StateLoader from '@/components/global/loader';

interface Props {
  totalPagerNumber: number | undefined;
  currentPageNumber: number;
}

const CurrentPageInfo = (props: Props) => {
  return (
    <div className='text-sm'>
      Page{' '}
      <span className='inline-flex items-center font-medium text-gray-200'>
        {props.currentPageNumber} of{' '}
        {props.totalPagerNumber ? props.totalPagerNumber : <StateLoader />}
      </span>
    </div>
  );
};

export default CurrentPageInfo;
