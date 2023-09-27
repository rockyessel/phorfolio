import React from 'react';
import { ProjectItem } from '@/interface';
import MainProjectSettings from './settings';
import SEOSettings from './seo';
import ProjectMetadataForm from './project';
import OptionalSectionButton from './optional';

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
  handleReset: () => void;
}

const ProjectMetadata = (props: Props) => {
  return (
    <React.Fragment>
      {props.showMetaDataDrawer === true ? null : (
        <div className='text-center'>
          <button
            className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            type='button'
            onClick={() =>
              props.setShowMetaDataDrawer((previousState) => !previousState)
            }
          >
            Metadata
          </button>
        </div>
      )}

      {props.showMetaDataDrawer === true && (
        <aside className='border-r-[1px] border-opacity-50 border-rose-500 relative z-[100] md:w-[30rem] px-1.5'>
          <form className='float-right h-screen overflow-y-auto w-full divide-y-[1px] divide-opacity-50 divide-rose-500'>
            {/* Close Button */}
            <button
              className='flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              type='button'
              onClick={() =>
                props.setShowMetaDataDrawer((previousState) => !previousState)
              }
            >
              Close
            </button>
            {/* Projects */}
            <MainProjectSettings
              handleMetadataChange={props.handleMetadataChange}
              setShowMetaDataDrawer={props.setShowMetaDataDrawer}
              setStateValue={props.setStateValue}
              showMetaDataDrawer={props.showMetaDataDrawer}
              stateValue={props.stateValue}
            />

            {/* Developer */}
            <ProjectMetadataForm
              handleMetadataChange={props.handleMetadataChange}
              stateValue={props.stateValue}
            />

            {/* SEO */}
            <SEOSettings
              handleMetadataChange={props.handleMetadataChange}
              stateValue={props.stateValue}
            />

            {/* Optional Section */}
            <OptionalSectionButton
              handleMetadataChange={props.handleMetadataChange}
              stateValue={props.stateValue}
            />

            {/* Save Button */}
            <fieldset className='pt-5 pb-2 px-4'>
              <button
                onClick={props.handleReset}
                type='reset'
                className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                Reset
              </button>
            </fieldset>
          </form>
        </aside>
      )}
    </React.Fragment>
  );
};

export default ProjectMetadata;
