import React from 'react';
import CommentInput from './create-input';
import { CommentProps } from '@/interface';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface CommentCardProps {
  comment: CommentProps | undefined; 
}

const CommentCard = ({ comment }: CommentCardProps) => {
  console.log('Individual comment ', comment?.comment_id);
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isArticlePath = router.asPath.includes('articles')

  const handleClickOutside = (e:any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <article className='p-6 text-base bg-white rounded-lg dark:bg-gray-900'>
      <footer className='flex justify-between items-center mb-2'>
        <div className='flex items-center'>
          <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
            <Image
              width={100}
              height={100}
              className='mr-2 w-6 h-6 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
              alt='Michael Gough'
            />
            Michael Gough
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            <time title='February 8th, 2022'>Feb. 8, 2022</time>
          </p>
        </div>
        <button
          onClick={toggleDropdown}
          id='dropdownComment1Button'
          data-dropdown-toggle='dropdownComment1'
          className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          type='button'
        >
          <svg
            className={`w-4 h-4 `}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 16 3'
          >
            <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
          </svg>
          <span className='sr-only'>Comment settings</span>
        </button>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className='z-10 w-36 relative bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
          >
            <ul
              className='absolute py-1 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownMenuIconHorizontalButton'
            >
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Remove
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        )}
      </footer>
      <p className='text-gray-500 dark:text-gray-400'>{comment?.content}</p>
      <div className='flex flex-col items-start mt-4 space-x-4'>
        <button
          type='button'
          onClick={() => setShowCommentInput((d) => !d)}
          className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium'
        >
          <svg className='mr-1.5 w-3.5 h-3.5' fill='none' viewBox='0 0 20 18'>
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
            />
          </svg>
          {showCommentInput ? 'Cancel Reply' : 'Reply'}
        </button>

        {/* Render the CommentInput for replies */}
        {showCommentInput && (
          <CommentInput
            type='reply'
            id={isArticlePath ? comment!.article_id : comment!.project_id}
            parentCommentId={comment!.comment_id} // Passing the comment ID as the parentCommentId
            style={undefined}
          />
        )}

        {/* Render replies */}
        {comment?.replies && comment.replies.length > 0 && (
          <div className='ml-8'>
            {comment.replies.map((reply) => (
              <CommentCard key={reply.comment_id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default CommentCard;
