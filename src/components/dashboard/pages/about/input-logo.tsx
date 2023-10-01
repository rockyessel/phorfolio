import React from 'react';
import Image from 'next/image';

interface Props {
  imageSRC: string;
  mainText: string;
  subText: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputLogo = (props: Props) => {
  return (
    <fieldset>
      <p className='text-left'>{props.mainText}</p>
      <p className='text-left text-xs text-gray-400'>{props.subText}</p>
      <fieldset className='relative flex items-center mt-4 md:mt-0'>
        <fieldset className='absolute'>
          <Image
            width={200}
            height={200}
            src={props.imageSRC}
            alt={`Logo`}
            className='mx-3 w-5 h-5'
          />
        </fieldset>
        <input
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          type='text'
          name={props.name}
          className='w-full py-2.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
        />
      </fieldset>
    </fieldset>
  );
};

export default InputLogo;
