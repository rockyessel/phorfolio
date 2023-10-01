import React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import CommentInput from './create-input';
import { CommentProps } from '@/interface';
import { AiOutlineComment } from 'react-icons/ai';
import GetUserData from '../global/users/get-user';
import { MdOutlineMoreHoriz } from 'react-icons/md';

interface Props {
  comment: CommentProps | undefined;
}

const CommentCard = (props: Props) => {
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const isArticlePath = router.asPath.includes('articles');

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    <article className='w-full p-6 text-base'>
      <header className='flex justify-between items-center mb-2'>
        <GetUserData
          userId={props.comment?.user_id}
          time={moment(props.comment?.created_at).format('MMM Do YY')}
        />
        <button
          onClick={toggleDropdown}
          id='dropdownComment1Button'
          data-dropdown-toggle='dropdownComment1'
          className='inline-flex items-center p-2 text-sm font-medium text-center'
          type='button'
        >
          <MdOutlineMoreHoriz />
          <span className='sr-only'>Comment settings</span>
        </button>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className='z-10 w-36 relative bg-white rounded divide-y divide-gray-100 shadow'>
            <ul className='absolute py-1 text-sm text-gray-700'>
              <li className='block py-2 px-4 hover:bg-gray-100'>Remove</li>
              <li className='block py-2 px-4 hover:bg-gray-100'>Report</li>
            </ul>
          </div>
        )}
      </header>
      <main>
        <p className=''>{props.comment?.content}</p>
      </main>
      <footer className='flex flex-col items-start mt-4 space-x-4'>
        {props.comment?.replies && (
          <button
            type='button'
            onClick={() => setShowCommentInput((d) => !d)}
            className='flex items-center gap-2 text-sm'
          >
            <AiOutlineComment />
            {showCommentInput ? 'Cancel Reply' : 'Reply'}
          </button>
        )}

        {/* Render the CommentInput for replies */}
        {showCommentInput && (
          <CommentInput
            type='reply'
            id={isArticlePath ? props.comment!.article_id : props.comment!.project_id}
            parentCommentId={props.comment!.comment_id} // Passing the comment ID as the parentCommentId
            style={undefined}
          />
        )}

        {/* Render replies only for top-level comments */}
        {props.comment?.replies && props.comment.replies.length > 0 && (
          <div className='w-full ml-8 border-t-[1px] border-rose-700 mt-4'>
            {props.comment.replies.map((reply) => (
              <CommentCard key={reply.comment_id} comment={reply} />
            ))}
          </div>
        )}
      </footer>
    </article>
  );
};

export default CommentCard;
