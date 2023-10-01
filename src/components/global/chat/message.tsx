import React from 'react';

interface Props {
  message: string;
}

const ChatMessage = (props: Props) => {
  return (
    <div className='w-full hover:bg-gray-50 p-2'>
      <div className='ml-10 relative prose-sm'>
        <span>{props.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
