import React from 'react';
import InputLogo from './input-logo';
import { AboutMe } from '@/interface';

interface Props {
  aboutMeForm: AboutMe;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WritingPlatforms = (props: Props) => {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='w-full flex flex-col'>
          <p className='py-2 text-xl font-semibold inline-flex flex-col gap-1'>
            Technical Writing Platform @
            <span className='text-sm text-400'>
              Provide the full URL to your preferred platform
            </span>
          </p>

          <form className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
            <InputLogo
              imageSRC={'/hashnode.png'}
              mainText={'Hashnode'}
              subText={'Provide full URL'}
              placeholder={''}
              value={props.aboutMeForm.hashnode_url}
              onChange={props.handleChange}
              name='hashnode_url'
            />
            <InputLogo
              imageSRC={'/devto.png'}
              mainText={'Dev.to'}
              subText={'Provide full URL'}
              placeholder={''}
              value={props.aboutMeForm.devto_url}
              onChange={props.handleChange}
              name='devto_url'
            />
            <InputLogo
              imageSRC={'/medium.png'}
              mainText={'Medium'}
              subText={'Provide full URL'}
              placeholder={''}
              value={props.aboutMeForm.medium_url}
              onChange={props.handleChange}
              name='medium_url'
            />
            <InputLogo
              imageSRC={'/hackernoon.jpeg'}
              mainText={'HackerNoon'}
              subText={'Provide full URL'}
              placeholder={''}
              value={props.aboutMeForm.hackernoon_url}
              onChange={props.handleChange}
              name='hackernoon_url'
            />
            <InputLogo
              imageSRC={'/freecodecamp.png'}
              mainText={'FreeCodeCamp'}
              subText={'Provide full URL'}
              placeholder={''}
              value={props.aboutMeForm.freecodecamp_url}
              onChange={props.handleChange}
              name='freecodecamp_url'
            />
            <InputLogo
              imageSRC={'/celog.png'}
              mainText={'Velog'}
              subText={'Provide full URL'}
              placeholder={''}
              value={props.aboutMeForm.velog_url}
              onChange={props.handleChange}
              name='velog_url'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WritingPlatforms;
