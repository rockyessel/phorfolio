import { ProjectItem } from '@/interface';
import React from 'react';
import MultipleImageUpload from './image';
import { createSlug } from '@/utils/helpers';

interface Props {
  showMetaDataDrawer: boolean;
  setShowMetaDataDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setStateValue: React.Dispatch<React.SetStateAction<ProjectItem>>;
  stateValue: ProjectItem;
  handleMetadataChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const MainProjectSettings = (props: Props) => {
  const handleGenerateSlug = () => {
    const generatedSlug = createSlug(props.stateValue.title);
    props.setStateValue({
      ...props.stateValue,
      slug: generatedSlug,
    });
  };

  return (
    <fieldset className='py-5'>
      <p className='text-left px-4'>Content Settings</p>
      <p className='text-left text-gray-400 text-sm px-4 mb-2'>
        When you fill this input your content get automatically promoted on the
        platform increasing your reach.
      </p>
      <MultipleImageUpload
        setStateValue={props.setStateValue}
        stateValue={props.stateValue}
      />

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Project Name</p>

        <fieldset className='w-full'>
          <input
            type='text'
            value={props.stateValue.title}
            onChange={props.handleMetadataChange}
            name='title'
            title='Project Name'
            placeholder='Project Name'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Post URL</p>

        <fieldset className='flex items-center gap-2'>
          <input
            type='text'
            value={createSlug(props.stateValue.slug)}
            name='slug'
            onChange={props.handleMetadataChange}
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            placeholder='Enter some tags'
          />
          <button
            onClick={handleGenerateSlug}
            title='Generate'
            type='button'
            className='flex items-center justify-center w-fit p-2 text-sm capitalize transition-colors duration-200 bg-transparent border rounded-md sm:w-auto gap-x-2 hover:bg-rose-700 hover:text-white hover:border-rose-700 active:ring-2 active:ring-rose-700'
          >
            Generate
          </button>
        </fieldset>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Tags</p>

        <fieldset>
          <input
            title='Tags'
            type='text'
            // value={props.stateValue.tags.replaceAll(' ', '-')}
            name='tags'
            onChange={props.handleMetadataChange}
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Caption</p>

        <fieldset>
          <form className='w-full'>
            <input
              type='text'
              value={props.stateValue.caption}
              onChange={props.handleMetadataChange}
              title='Caption'
              name='caption'
              placeholder='Enter'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </form>
        </fieldset>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left my-2.5'>Disable Comments</p>

        <fieldset className='w-full inline-flex items-start'>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              checked={props.stateValue.is_comment_disabled}
              className='sr-only peer'
              type='checkbox'
              onChange={props.handleMetadataChange}
              title='Disable Comments'
              name='is_comment_disabled'
            />
            <div className="w-11 h-6 bg-rose-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-rose-900 after:border-rose-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            <span className='ml-3 text-sm font-medium'>
              {props.stateValue.is_comment_disabled ? 'Yes' : 'No'}
            </span>
          </label>
        </fieldset>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Is this project linked to a certificate?.</p>
        <p className='text-left text-xs text-gray-400'>
          Provide a URL to a certificate where this project is linked with. It
          can be any certificate.
        </p>
      </fieldset>

      <fieldset className='w-full px-4 py-2'>
        <p className='text-left'>Certificate URL</p>

        <fieldset>
          <form className='w-full'>
            <input
              type='text'
              value={props.stateValue.certificate_url}
              onChange={props.handleMetadataChange}
              title='Certificate URL'
              name='certificate_url'
              placeholder='Enter'
              className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </form>
        </fieldset>
      </fieldset>
    </fieldset>
  );
};

export default MainProjectSettings;
