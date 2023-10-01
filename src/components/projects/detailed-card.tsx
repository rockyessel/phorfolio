import React from 'react';
import Image from 'next/image';
import ProjectHeader from './header';
import { ProjectItem } from '@/interface';
import EditorOutput from '../EditorOutput';
import { AiOutlineClose } from 'react-icons/ai';
import { OutputData } from '@editorjs/editorjs';
import OtherProjectDetails from './other-details';
import { decodeBase64ToObject, deserialize } from '@/utils/helpers';

interface Props {
  data: ProjectItem;
}

const ProjectDetailsCard = (props: Props) => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [showCredentialButton, setShowCredentialButton] = React.useState(false);
  const [image, setImage] = React.useState<number>(0);
  const images = props.data?.images?.split(',')?.map((image) => image.trim());
  const decodedContent = decodeBase64ToObject(props.data?.content);
  const deserializeContent: OutputData = deserialize(decodedContent);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const threshold = 1000;
      if (window.scrollY > threshold) {
        setIsSticky(true);
        setShowCredentialButton(true);
      } else {
        setIsSticky(false);
        setShowCredentialButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <ProjectHeader data={props.data} />
      <main>
        <div>
          <Image
            className='w-full rounded-md mb-4 shadow-md'
            src={images && images[image]}
            width={1000}
            height={1000}
            alt=''
            priority
          />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          {images?.map((img, index) => (
            <Image
              key={index}
              className='rounded-sm mb-4 w-10 sm:w-16 md:w-24 md:h-20 object-cover object-center shadow-md'
              src={img !== null ? img : ''}
              width={1000}
              height={1000}
              onClick={() => setImage(index)}
              alt={props.data?.title}
              priority
            />
          ))}
        </div>
        {showCredentialButton && (
          <button
            title=''
            onClick={openModal}
            className={`inline-flex m-5 text-lg items-center justify-center w-1/2 px-5 py-2 capitalize bg-rose-700 border rounded-md sm:w-auto gap-x-2  active:ring-2 active:ring-rose-700 relative scale-[1] active:scale-[0.9] duration-150 transition-all ${
              isSticky ? '!sticky h-16 top-12' : ''
            }`}
          >
            <span className='mt-6'>Credentials</span>
          </button>
        )}
        <EditorOutput content={deserializeContent} />
      </main>
      <>
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
            <div className='relative w-auto max-w-lg mx-auto my-6'>
              {/* Modal content */}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#131b24] outline-none focus:outline-none'>
                {/* Header */}
                <div className='flex items-start justify-between p-5 gap-20 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Other Credential</h3>

                  <button
                    title='Close'
                    className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={closeModal}
                  >
                    <span className='bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      <AiOutlineClose />
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className='flex flex-col gap-5 relative p-6 flex-auto'>
                  <OtherProjectDetails />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity ${
            isModalOpen ? 'visible' : 'invisible'
          }`}
          onClick={closeModal}
        ></div>
      </>
    </React.Fragment>
  );
};

export default ProjectDetailsCard;
