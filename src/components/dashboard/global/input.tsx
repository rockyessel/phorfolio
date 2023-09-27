import React from 'react';

interface Props extends HTMLInputElement {
  label: string;
}

const MetadataInput = (props: Props) => {
  return (
    <fieldset className='w-full px-4 py-2'>
      <p className='text-left'>{props.label}L</p>

      <fieldset className='flex items-center gap-2'>
        <input
          type='text'
          name='slug'
          className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          placeholder='Enter some tags'
        />
      </fieldset>
    </fieldset>
  );
};

export default MetadataInput;
