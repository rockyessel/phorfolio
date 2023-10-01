import React from 'react';

const OtherProjectDetails = () => {
  return (
    <div className='flex flex-col gap-5 relative p-6 flex-auto'>
      <div>
        <p className='text-xl'>Project Login Information:</p>
        <p className='text-sm text-gray-200'>
          username: rockyessel <br />
          password: rockysmitHcds <br />
          name: ROcky Essel <br />
        </p>
      </div>
      <div>
        <p className='text-xl'>Project Dependence:</p>
        <p className='text-sm text-gray-200 inline-flex items-center flex-wrap'>
          <span className='p-1 border border-rose-600 rounded-lg'>
            moment.js
          </span>
          <span className='p-1 border border-rose-600 rounded-lg'>
            moment.js
          </span>
          <span className='p-1 border border-rose-600 rounded-lg'>
            moment.js
          </span>
        </p>
      </div>
      <div>
        <p className='text-xl'>Video Link:</p>
        <p>Here</p>
      </div>
      <div>
        <p className='text-xl'>Project status:</p>
        <p>Completed</p>
      </div>
      <div>
        <p className='text-xl'>Licenses:</p>
        <p>MIT</p>
      </div>
    </div>
  );
};

export default OtherProjectDetails;
