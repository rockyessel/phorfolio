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

const OptionalSectionButton = (props: Props) => {
  const [showOptionalSection, setShowOptionalSection] = React.useState(false);
  return showOptionalSection ? (
    <React.Fragment>
      <fieldset className='pt-5 pb-2 px-4'>
        <button
          className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
          type='button'
          onClick={() =>
            setShowOptionalSection((previousState) => !previousState)
          }
        >
          {showOptionalSection
            ? 'Hide Optional Section'
            : 'Show Optional Section'}
        </button>
        <fieldset className='w-full px-4 py-2'>
          <p className='text-left'>Video URL</p>

          <fieldset>
            <input
              type='text'
              value={props.stateValue.video_url}
              onChange={props.handleMetadataChange}
              name='video_url'
              title='Video URL'
              placeholder='Enter video URL'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </fieldset>
        </fieldset>

        <fieldset className='w-full px-4 py-2'>
          <p className='text-left'>Contributors</p>

          <fieldset>
            <input
              type='text'
              value={props.stateValue.contributors}
              onChange={props.handleMetadataChange}
              name='contributors'
              title='Contributors'
              placeholder='Enter contributors'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </fieldset>
        </fieldset>

        <fieldset className='w-full px-4 py-2'>
          <p className='text-left'>Licenses</p>

          <fieldset>
            <input
              type='text'
              value={props.stateValue.licenses}
              onChange={props.handleMetadataChange}
              name='licenses'
              title='Licenses'
              placeholder='Enter licenses'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </fieldset>
        </fieldset>

        <fieldset className='w-full px-4 py-2'>
          <p className='text-left'>Support Email</p>

          <fieldset>
            <input
              type='text'
              value={props.stateValue.support_email}
              onChange={props.handleMetadataChange}
              name='support_email'
              title='Support Email'
              placeholder='Enter support email'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus-border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </fieldset>
        </fieldset>

        <fieldset className='w-full px-4 py-2'>
          <p className='text-left'>Demo Credentials</p>

          <fieldset>
            <textarea
              value={props.stateValue.demo_credentials}
              onChange={props.handleMetadataChange}
              name='demo_credentials'
              title='Demo Credentials'
              placeholder='username: rockyessel..'
              className='appearance-none block w-full py-1.5 pr-5 h-20 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus-border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            ></textarea>
          </fieldset>
        </fieldset>
      </fieldset>
    </React.Fragment>
  ) : (
    <button
      className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      type='button'
      onClick={() => setShowOptionalSection((previousState) => !previousState)}
    >
      {showOptionalSection ? 'Hide Optional Section' : 'Show Optional Section'}
    </button>
  );
};

export default OptionalSectionButton;
