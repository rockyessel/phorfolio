import React from 'react'
import { AboutMe } from '@/interface';

interface Props {
  aboutMeForm: AboutMe;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AboutDeveloper = (props:Props) => {
  return (
    <div>
      <p className='py-2 text-xl font-semibold'>Profile</p>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <form className='w-full'>
          <fieldset>
            <p className='text-gray-400'>
              This information will be share across this platform. And note
              every information should authentic
            </p>
            <fieldset className='w-full flex items-center gap-12 mt-3'>
              <fieldset className='w-full'>
                <p className='text-left'>Full name</p>
                <p className='text-left text-xs text-gray-400'>
                  Provide your real name here.
                </p>
                <fieldset className='mt-2'>
                  <input
                    onChange={props.handleChange}
                    value={props.aboutMeForm.full_name}
                    type='text'
                    required
                    name='full_name'
                    title='Full Name'
                    placeholder='Enter GitHub repo URL'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>
              <fieldset className='w-full'>
                <p className='text-left'>Email</p>
                <p className='text-left text-xs text-gray-400'>
                  Provide the e-mail address you always check on.
                </p>
                <fieldset className='mt-2'>
                  <input
                    type='text'
                    required
                    onChange={props.handleChange}
                    value={props.aboutMeForm.email}
                    name='email'
                    title='Email'
                    placeholder='Enter GitHub repo URL'
                    className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </fieldset>
              </fieldset>
            </fieldset>
          </fieldset>
          <fieldset className='w-full mt-4'>
            <p className='text-left'>Github username @</p>

            <fieldset className='mt-2'>
              <input
                type='text'
                required
                onChange={props.handleChange}
                value={props.aboutMeForm.github_username}
                name='github_username'
                title='Github Username @'
                placeholder='rockyessel'
                className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </fieldset>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default AboutDeveloper
