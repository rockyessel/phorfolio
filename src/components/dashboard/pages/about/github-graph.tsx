import React from 'react';
import { AboutMe } from '@/interface';

interface Props {
  aboutMeForm: AboutMe;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GithubGraph = (props: Props) => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='py-2 text-xl font-semibold inline-flex flex-col gap-1'>
            Github Graph
            <span className='text-sm text-400'>
              Would you like to show your Github Contribution on the about page.
            </span>
          </p>
          <form className='w-full inline-flex items-start'>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                className='sr-only peer'
                type='checkbox'
                onChange={props.handleChange}
                checked={props.aboutMeForm.show_github_graph}
                title='Disable Github Graph'
                name='show_github_graph'
              />
              <div className="w-11 h-6 bg-rose-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-rose-900 after:border-rose-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              <span className='ml-3 text-sm font-medium'>
                {props.aboutMeForm.show_github_graph ? 'Yes' : 'No'}
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GithubGraph;
