import React from 'react';

interface Props {
  setCommentSystem: React.Dispatch<React.SetStateAction<string>>;
}

const CommentSystemSelector = (props: Props) => {
  return (
    <div className='flex items-center gap-5 border-b-[1px] border-rose-700 border-opacity-50 pb-5'>
      <button
        type='button'
        title='Internal Comment System'
        onClick={() => props.setCommentSystem('Internal')}
      >
        Internal
      </button>
      <button
        type='button'
        title='External Comment System'
        onClick={() => props.setCommentSystem('External')}
      >
        External
      </button>
    </div>
  );
};

export default CommentSystemSelector;
