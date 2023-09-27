import React, { useState, useEffect } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
  buttonName: string | undefined;
  styles?: string;
}

const ModalWrapper = (props: Props) => {
  const router = useRouter();
  const [isWrapperModalOpened, setIsWrapperModalOpened] = useState(false);

  useEffect(() => {
    // Check if the path includes "edit"
    if (router.asPath.includes('/edit')) {
      setIsWrapperModalOpened(true);
    }
  }, [router.asPath]);

  const openWrapperModal = () => setIsWrapperModalOpened(true);
  const closeWrapperModal = () => setIsWrapperModalOpened(false);

  return (
    <main>
      <button
        type='button'
        title='Open Modal'
        onClick={openWrapperModal}
        className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
      >
        <HiOutlinePlusCircle />
        <span>{props.buttonName}</span>
      </button>
      {isWrapperModalOpened && (
        <div className='fixed inset-0 z-50 w-full force-overflow-hidden'>
          <div
            className={`absolute inset-0 bg-[#0e141b] w-full ${
              props.styles ? props.styles : ''
            }`}
          />
          <div className='relative w-full h-screen overflow-y-auto flex flex-col'>
            {props.children}
          </div>
          {router.asPath.includes('/edit') ? (
            <button
              type='button'
              title='Go Back'
              onClick={() => router.back()}
              className='fixed m-5 top-0 right-0 inline-flex items-center justify-center p-4 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              Go Back
            </button>
          ) : (
            <button
              type='button'
              title='Close Modal'
              onClick={closeWrapperModal}
              className='fixed m-5 top-0 right-0 inline-flex items-center justify-center p-4 text-sm capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
            >
              <TfiClose />
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default ModalWrapper;
