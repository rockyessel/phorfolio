import React from 'react';

interface Props {
  children: React.ReactNode;
}
const BodyWrapper = (props: Props) => {
  return (
    <div className='flex flex-col justify-between w-full'>{props.children}</div>
  );
};

export default BodyWrapper;
