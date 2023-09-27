import React, { useState } from 'react';
import deviconjson from '../../../../../devicon.json';
import Image from 'next/image';

interface Props {
  initialStateValues: { name: string; value: string }[];
}

const ProgrammingLanguageDropdown = (props: Props) => {
  console.log(props);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language: string) => {
    if (selectedLanguages.includes(language)) {
      console.log('Already added!');
      return;
    }
    setSelectedLanguages((prevSelectedLanguages) => [
      ...prevSelectedLanguages,
      language,
    ]);
    setIsOpen(false);
  };

  const getLanguageLogoUrl = (language: string) => {
    const lan = language.toLowerCase().trim();
    const c = deviconjson.filter((icon) => icon.name === lan).pop()
      ?.versions.svg;
    if (c?.includes('plain')) {
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lan}/${lan}-plain.svg`;
    } else if (c?.includes('original')) {
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lan}/${lan}-original.svg`;
    } else if (!c?.includes('plain') && !c?.includes('original'))
      return '/favicon-16x16.png';
  };

  const removeLanguage = (language: string) => {
    setSelectedLanguages((prevSelectedLanguages) =>
      prevSelectedLanguages.filter(
        (selectedLanguage) => selectedLanguage !== language
      )
    );
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          onClick={toggleDropdown}
          type='button'
          className='inline-flex justify-center w-[48] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'
        >
          {selectedLanguages.length === props.initialStateValues.length
            ? 'All language Selected`'
            : 'Select Language(s)'}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M8.293 7.293a1 1 0 011.414 0L10 8.586l.293-.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L10 8.586l.293-.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 h-56 overflow-y-auto bg-[#131b24] z-[1000]'
        >
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {props.initialStateValues?.map((language) => (
              <button
                key={language.value}
                onClick={() => handleLanguageSelect(language.value)}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left flex items-center'
                role='menuitem'
              >
                <Image
                  width={100}
                  height={100}
                  src={`${getLanguageLogoUrl(language.value)}`}
                  alt={`${language.name} Logo`}
                  className='mr-2 w-6 h-6'
                />
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedLanguages.length > 0 && (
        <div className='mt-2'>
          <p className='text-sm font-medium text-gray-700'>
            Selected Language(s):
          </p>
          <div className='mt-1 flex items-center gap-2 flex-wrap w-full'>
            {selectedLanguages.map((language) => (
              <button
                type='button'
                title={language}
                key={language}
                onDoubleClick={() => removeLanguage(language)}
                className='inline-flex items-center gap-1 border-[1px] capitalize w-fit p-1 rounded-lg border-rose-700 border-opacity-50 hover:ring-2 hover:ring-rose-500'
              >
                <Image
                  width={100}
                  height={100}
                  src={`${getLanguageLogoUrl(language)}`}
                  alt={`${language} Logo`}
                  className='mr-2 w-6 h-6'
                />
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammingLanguageDropdown;

{
  /* <button
                  onClick={() => removeLanguage(language)}
                  className='text-red-600 hover:text-red-800'
                >
                  Remove
                </button> */
}
