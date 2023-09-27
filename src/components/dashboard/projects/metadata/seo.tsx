import { ProjectItem } from '@/interface';
import React from 'react';

interface Props {
  stateValue: ProjectItem;
  handleMetadataChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const SEOSettings = (props: Props) => {
  return (
    <fieldset className='py-5 '>
      <p className='text-left px-4'>SEO</p>
      <p className='text-left text-gray-400 text-sm px-4 mb-2'>
        Twitter card, Facebook Card, Linkedin card are automatically generated
        for you based on the content below.
      </p>
      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Keywords</p>

        <fieldset>
          <form className='w-full'>
            <input
              type='text'
              value={props.stateValue.keywords}
              onChange={props.handleMetadataChange}
              title='Keywords'
              name='keywords'
              placeholder='Enter'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </form>
        </fieldset>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Description</p>

        <fieldset>
          <textarea
            value={props.stateValue.description}
            onChange={props.handleMetadataChange}
            name='description'
            title='Description'
            placeholder='Write a description for your title...'
            className='block h-28 w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          ></textarea>
        </fieldset>
      </fieldset>
    </fieldset>
  );
};

export default SEOSettings;
