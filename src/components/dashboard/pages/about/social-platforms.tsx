import React from 'react';
import InputLogo from './input-logo';
import { AboutMe } from '@/interface';

interface Props {
  aboutMeForm: AboutMe;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialPlatforms = (props: Props) => {
  return (
    <div className='w-full mb-4'>
      <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='w-full flex flex-col'>
          <p className='py-2 text-xl font-semibold inline-flex flex-col gap-1'>
            Social Platform @
            <span className='text-sm text-400'>
              Provide the full URL to your preferred platform
            </span>
          </p>

          <div>
            <form className='w-full grid grid-cols-1 md:grid-cols-2 gap-5'>
              <InputLogo
                imageSRC={'/socials/facebook.png'}
                mainText={'Facebook'}
                subText={'Provide full URL'}
                placeholder={''}
                value={props.aboutMeForm.facebook_url}
                onChange={props.handleChange}
                name='facebook_url'
              />
              <InputLogo
                imageSRC={'/socials/twitter.png'}
                mainText={'X(Twitter)'}
                subText={'Provide full URL'}
                placeholder={''}
                value={props.aboutMeForm.x_url}
                onChange={props.handleChange}
                name='x_url'
              />
              <InputLogo
                imageSRC={'/socials/instagram.png'}
                mainText={'Instagram'}
                subText={'Provide full URL'}
                placeholder={''}
                value={props.aboutMeForm.instagram_url}
                onChange={props.handleChange}
                name='instagram_url'
              />
              <InputLogo
                imageSRC={'/socials/linkedin.jpeg'}
                mainText={'Linkedin'}
                subText={'Provide full URL'}
                placeholder={''}
                value={props.aboutMeForm.linkedin_url}
                onChange={props.handleChange}
                name='linkedin_url'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPlatforms;
