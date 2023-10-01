import React from 'react';

interface Props {
  children: React.ReactNode;
}
const MegaBox = (props: Props) => {
  return (
    <div className='overflow-y-auto !h-[27rem] py-5 px-4 w-full flex flex-col gap-2'>
      {props.children}
    </div>
  );
};

export default MegaBox;
