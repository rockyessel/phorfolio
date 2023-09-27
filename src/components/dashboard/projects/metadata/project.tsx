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

const ProjectMetadataForm = (props: Props) => {
  return (
    <fieldset className='pt-5 pb-2 px-4 flex flex-col gap-5'>
      <fieldset>
        <p className='text-left'>Main Project Metadata</p>
        <p className='text-left text-gray-400 text-sm mb-2'>
          Above fields should be fill, as it is required.
        </p>
      </fieldset>
      <fieldset className=''>
        <p className='text-left'>GitHub Repository</p>
        <p className='text-left text-xs text-gray-400'>
          URL to the GitHub repository of the project.
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.github_repo}
            onChange={props.handleMetadataChange}
            name='github_repo'
            title='GitHub Repository'
            placeholder='Enter GitHub repo URL'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Live Demo URL</p>
        <p className='text-left text-xs text-gray-400'>
          URL to a live demo or the project&apos;s website.
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.live_demo_url}
            onChange={props.handleMetadataChange}
            name='live_demo_url'
            title='Live Demo URL'
            placeholder='Enter live demo URL'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Technologies</p>
        <p className='text-left text-xs text-gray-400'>
          An list of technologies used in the project. Separate with comma{' '}
          {`(",")`}
        </p>

        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.technologies}
            onChange={props.handleMetadataChange}
            name='technologies'
            title='Technologies'
            placeholder='Enter technologies'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus-border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Frameworks</p>
        <p className='text-left text-xs text-gray-400'>
          An list of frameworks used in the project. Separate with comma{' '}
          {`(",")`}
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.frameworks}
            onChange={props.handleMetadataChange}
            name='frameworks'
            title='Frameworks'
            placeholder='Enter frameworks'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Dependencies</p>
        <p className='text-left text-xs text-gray-400'>
          An list of dependencies used in the project. Separate with comma{' '}
          {`(",")`}
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.dependencies}
            onChange={props.handleMetadataChange}
            name='dependencies'
            title='Dependencies'
            placeholder='Enter dependencies'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Project Status</p>
        <p className='text-left text-xs text-gray-400'>
          The current status of the project.
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.project_status}
            onChange={props.handleMetadataChange}
            name='project_status'
            title='Project Status'
            placeholder='Completed | In Progress'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus-border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Deployment Status</p>
        <p className='text-left text-xs text-gray-400'>
          Twitter card, Facebook Card, Linkedin card are automatically generated
          for you based on the content below.
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.deployment_status}
            onChange={props.handleMetadataChange}
            name='deployment_status'
            title='Deployment Status'
            placeholder='Deployed'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus-border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>

      <fieldset className=''>
        <p className='text-left'>Deployment Platform</p>
        <p className='text-left text-xs text-gray-400'>
          Platform for deployment
        </p>
        <fieldset>
          <input
            type='text'
            required
            value={props.stateValue.deployment_platform}
            onChange={props.handleMetadataChange}
            name='deployment_platform'
            title='Deployment Platform'
            placeholder='eg. Vercel, Heruku etc..'
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus-border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </fieldset>
      </fieldset>
    </fieldset>
  );
};

export default ProjectMetadataForm;
