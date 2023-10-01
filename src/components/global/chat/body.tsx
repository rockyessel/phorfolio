import React from 'react';
import { BsEmojiLaughing } from 'react-icons/bs';
import ChatMessage from './message';
import UserChatWithTimestamp from './user-timestamp';

interface Props {
  chatHistory: any[] | undefined;
  selectedConversation: any;
}

const ChatBody = (props: Props) => {
  return (
    <div className='flex-1 flex flex-col gap-2 p-4 overflow-y-auto'>
      {props?.chatHistory?.[props.selectedConversation?.id]?.map(
        (chatObject: any, index: number) => (
          <div key={index}>
            {/* <UserChatWithTimestamp
              message={}
            /> */}
            <ChatMessage message={chatObject?.message} />
          </div>
        )
      )}
    </div>
  );
};

export default ChatBody;
