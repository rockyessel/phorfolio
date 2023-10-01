import { AboutMe } from '@/interface';
import { getImageURL } from '@/utils/req';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';

interface Props {
  setAboutMeForm: React.Dispatch<React.SetStateAction<AboutMe>>;
  image:string
}

const AboutProfileUpload = (props: Props) => {
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [image, setImage] = React.useState<string>('');

  React.useEffect(() => {
    if(props.image !== '') setImage(props.image)
  },[props.image])

  const handleFileUploads = async () => {
    if (selectedFile) {
      const imgURL = await getImageURL(selectedFile);
      if (imgURL) {
        props.setAboutMeForm((preAboutMeValues) => ({
          ...preAboutMeValues,
          profile_url: imgURL,
        }));
        setImage(imgURL);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <div>
      <p className='py-2 text-xl font-semibold'>Profile Picture</p>
      <div className='flex items-center'>
        <div className='flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3'>
          <div className='w-48 h-48 relative'>
            {!image && (
              <label className='inline-flex items-center justify-center bg-rose-500 w-full h-full rounded-full border-dashed border-rose-700 border-[1px] border-opacity-50'>
                <span className='w-full h-full inline-flex items-center text-4xl font-bold backdrop-blur-lg dark:text-gray-400 rainbow rounded-full justify-center'>
                  RE
                </span>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='w-0 h-0'
                />
              </label>
            )}
            {image && (
              <Image
                src={image}
                width={1000}
                height={1000}
                alt='About user'
                className='w-full h-full object-cover object-center rounded-full ring-2 ring-rose-600 hover:ring-4 transition-all duration-150 ease-in-out'
                priority
              />
            )}
          </div>
        </div>

        <div className='flex flex-col'>
          {!image && (
            <button
              onClick={handleFileUploads}
              type='submit'
              disabled={selectedFile === undefined}
              className={`inline-flex mx-5 my-2 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700 ${
                selectedFile === undefined && 'cursor-not-allowed'
              }`}
            >
              Upload a Picture
            </button>
          )}
          {image && (
            <button
              onClick={() => {
                setImage('');
                setSelectedFile(undefined);
                toast.success('Ready to upload.');
              }}
              type='submit'
              className='inline-flex mx-5 my-2 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Change Picture
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutProfileUpload;
