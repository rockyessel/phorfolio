import React from 'react';

interface Props {
  filteredItems: any;
  view: string;
  setView: React.Dispatch<string>;
}

const ViewButtons = (props: Props) => {
  const buttons = [
    { label: 'View all', value: 'all' },
    { label: 'Published', value: 'published' },
    { label: 'Not Published', value: 'unpublished' },
  ];

  return (
    <div className='inline-flex overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse'>
      {buttons.map((button) => (
        <button
          key={button.value}
          disabled={props.filteredItems === undefined}
          type='button'
          title={button.label}
          className={`px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm ${
            props.view === button.value
              ? 'bg-gray-100 flex-1 transition-all ease-linear duration-300'
              : ''
          }  ${props.filteredItems === undefined ? 'cursor-not-allowed' : ''}`}
          onClick={() => props.setView(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ViewButtons;
