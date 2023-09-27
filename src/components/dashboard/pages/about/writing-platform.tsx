import Image from 'next/image';
import React, { useState } from 'react';

const WritingPlatformDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
  const [platforms, setPlatforms] = useState([
    { name: 'Hashnode', value: 'hashnode', logo: '/hashnode.png' },
    { name: 'Dev.to', value: 'devto', logo: '/devto.png' },
    { name: 'Medium', value: 'medium', logo: '/medium.png' },
    { name: 'HackerNoon', value: 'hackernoon', logo: '/hackernoon.jpeg' },
    { name: 'FreeCodeCamp', value: 'freecodecamp', logo: '/freecodecamp.png' },
    { name: 'Velog', value: 'velog', logo: '/celog.png' },
    { name: 'Others', value: 'others', logo: '/others.png' },
  ]);
  const [platformInputs, setPlatformInputs] = useState<any[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    const handlePlatformSelect = (platform: any) => {
      setSelectedPlatforms([...selectedPlatforms, platform]);
      setIsOpen(false);
    };

  const handlePlatformInputChange = (event: any, platform: any) => {
    const updatedInputs = [...platformInputs];
    const platformIndex = selectedPlatforms.indexOf(platform);

    if (platformIndex !== -1) {
      updatedInputs[platformIndex] = event.target.value;
      setPlatformInputs(updatedInputs);
    }
  };

  const handleRemovePlatform = (platform: any) => {
    const updatedPlatforms = selectedPlatforms.filter(
      (selectedPlatform) => selectedPlatform !== platform
    );
    const updatedInputs = platformInputs.filter(
      (input, index) => selectedPlatforms[index] !== platform
    );

    setSelectedPlatforms(updatedPlatforms);
    setPlatformInputs(updatedInputs);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          onClick={toggleDropdown}
          className='inline-flex justify-center truncate w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          id='platform-menu'
          aria-haspopup='true'
          aria-expanded='true'
        >
          {selectedPlatforms.length === 0
            ? 'Select platform(s)'
            : selectedPlatforms.join(', ')}
        </button>
      </div>

      {isOpen && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
          // role='menu'
          // aria-orientation='vertical'
          // aria-labelledby='platform-menu'
        >
          <div className='py-1' role='none'>
            {platforms.map((platform) => (
              <div
                key={platform.value}
                className={`${
                  selectedPlatforms.includes(platform.name)
                    ? 'bg-indigo-200'
                    : 'bg-white'
                } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex items-center`}
                onClick={() => handlePlatformSelect(platform.name)}
              >
                <Image
                  width={200}
                  height={200}
                  src={platform.logo}
                  alt={`${platform.name} Logo`}
                  className='mr-2 w-6 h-6'
                  priority={true}
                />
                {platform.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPlatforms.map((selectedPlatform, index) => (
        <div key={selectedPlatform} className='mt-2'>
          <input
            type='text'
            value={platformInputs[index] || ''}
            required
            name={selectedPlatform}
            title={selectedPlatform}
            placeholder={`Enter your ${selectedPlatform} URL`}
            className='appearance-none block w-full py-1.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-4 rtl:pr-4 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
            onChange={(event) =>
              handlePlatformInputChange(event, selectedPlatform)
            }
          />

          <button
            type='button'
            onClick={() => handleRemovePlatform(selectedPlatform)}
            className='mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300'
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default WritingPlatformDropdown;
