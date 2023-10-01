import React from 'react';
import { BsEmojiLaughing, BsSendPlus } from 'react-icons/bs';

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: any;
  messageInput: string;
}

const ChatSendButton = (props: Props) => {
  return (
    <div className='w-full px-4 mb-2'>
      <div className='w-full flex items-center gap-1 px-4 py-2 border-[1px] rounded-md max-h-20 relative'>
        <BsEmojiLaughing className='text-rose-800 text-xl' />
        <input
          value={props.messageInput}
          onChange={props.handleChange}
          type='text'
          className='min-h-[2rem] flex-1 max-h-20 w-full content-center outline-none relative overflow-y-auto'
        />
        <BsSendPlus
          onClick={props.sendMessage}
          className='text-rose-800 text-xl w-12  bg-rose-200'
        />
      </div>
    </div>
  );
};

export default ChatSendButton;
