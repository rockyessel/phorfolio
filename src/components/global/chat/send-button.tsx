import React from 'react'
import { BsEmojiLaughing, BsSendPlus } from 'react-icons/bs';


interface Props{
    handleContentChange:()=>void
    handleSendMessage:()=>void
}

const ChatSendButton = (props:Props) => {
  return (
    <div className='w-full px-4 mb-2'>
      <div className='w-full flex items-center gap-1 px-4 py-2 border-[1px] rounded-md bg-gray-50 max-h-20 relative'>
        <BsEmojiLaughing className='text-blue-500 text-xl' />
        <div
          className='min-h-[1rem] flex-1 max-h-20 w-full content-center outline-none relative overflow-y-auto'
          contentEditable
          onInput={props.handleContentChange}
        ></div>
        <BsSendPlus
          onClick={props.handleSendMessage}
          className='text-blue-500 text-xl'
        />
      </div>
    </div>
  );
}

export default ChatSendButton
