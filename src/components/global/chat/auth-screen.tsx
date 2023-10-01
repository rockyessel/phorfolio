import useSubdomain from '@/hooks/subdomain';
import { User } from '@/interface';
import { findUserByUsername } from '@/utils/outerbase-req/users';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import StateLoader from '../loader';
import { AiOutlineClose } from 'react-icons/ai';
import AuthUI from '@/components/auth/ui';

const AuthScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User>();
  const subdomain = useSubdomain(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (subdomain) {
      findUserByUsername(subdomain)
        .then((user) => setUser(user))
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [subdomain]);

  return (
    <React.Fragment>
      <div className='w-full h-full flex items-center justify-center'>
        {loading ? (
          <div className='w-full h-full flex items-center justify-center'>
            <StateLoader styles='text-2xl' />
          </div>
        ) : (
          user && (
            <div className='flex flex-col items-center justify-center'>
              <div className='w-40 rounded-full duration-150 ease-in-out hover:ring-8 hover:ring-rose-300 ring-2 ring-rose-700 h-40 overflow-hidden flex flex-col'>
                <Image
                  src={user.image}
                  alt={user.name}
                  width={1000}
                  height={1000}
                  className='w-full h-full object-cover rounded-full ring-2 ring-rose-700'
                />
              </div>
                <button
                  type='button'
                onClick={openModal}
                title='Register'
                className='inline-flex m-5 items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-rose-700 border rounded-md sm:w-auto gap-x-2 hover:bg-transparent hover:text-rose-700 hover:border-rose-700 active:ring-2 active:ring-rose-700'
              >
                Authenticate
              </button>
            </div>
          )
        )}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
          <div className='relative w-auto max-w-lg mx-auto my-6'>
            {/* Modal content */}
            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#131b24] outline-none focus:outline-none'>
              {/* Header */}
              {/* <div className='flex items-start justify-between p-5 gap-20 border-b border-solid border-blueGray-200 rounded-t'>
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
              </div> */}
              {/* Body */}
              <div className='w-full'>
                <AuthUI type='register' />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AuthScreen;
