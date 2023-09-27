import { ProjectItem } from '@/interface';
import { getMultipleFileURL } from '@/utils/req';
import React from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface Props {
  setStateValue: React.Dispatch<React.SetStateAction<ProjectItem>>;
  stateValue: ProjectItem;
}

const MultipleImageUpload = (props: Props) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleCancelUpload = () => setSelectedFiles([]);

  const handleFileUploads = async () => {
    if (selectedFiles) {
      const imgURL = await getMultipleFileURL(selectedFiles);
      const combinedString = imgURL.join(', ');
      if (imgURL) {
        props.setStateValue({
          ...props.stateValue,
          images: combinedString,
        });
        handleCancelUpload();
      }
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files: File[] = Array.from(event.target.files); // Convert FileList to an array
      setSelectedFiles(files);
    }
  };

  return (
    <fieldset className='w-full px-4 py-2'>
      <p className='text-left'>Cover Image</p>
      <fieldset>
        <fieldset className='flex items-center justify-center w-full'>
          {selectedFiles.length === 0 ? (
            <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50'>
              <fieldset className='flex flex-col items-center justify-center pt-5 pb-6'>
                <AiOutlineCloudUpload />
                <p className='mb-2 text-sm text-gray-500'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-gray-500'>
                  SVG, PNG, JPG or GIF (MAX. 1200x600px)
                </p>
              </fieldset>
              <input
                title='File'
                onChange={handleFileChange}
                type='file'
                multiple
                className='hidden'
              />
            </label>
          ) : (
            <fieldset className='w-full h-40 flex flex-col border-rose-800 gap-2.5 border-dashed border-2 items-center justify-center rounded-lg'>
              <button
                className='inline-flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                onClick={handleFileUploads}
                type='button'
              >
                <AiOutlineCloudUpload /> Upload Now
              </button>
              <button
                className='flex items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
                onClick={handleCancelUpload}
                type='button'
              >
                Cancel Upload
              </button>
            </fieldset>
          )}
        </fieldset>
      </fieldset>
    </fieldset>
  );
};

export default MultipleImageUpload;
