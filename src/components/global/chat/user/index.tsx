import Image from 'next/image';
import React from 'react';
import ChatBox from '../box';
import { useSession } from 'next-auth/react';
import ChatHead from '../head';
import ChatBody from '../body';
import ChatSendButton from '../send-button';
import { dummyChatHistory } from '..';
import AuthScreen from '../auth-screen';
import axios from 'axios';

const UserChat = () => {
  const [minimize, setMinimize] = React.useState('450');
  const [editableContent, setEditableContent] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<any[]>(dummyChatHistory);
  const [selectedUser, setSelectedUser] = React.useState<any>();


  const { status } = useSession();
  console.log('status', status);

  const handleContentChange = () => {};
  const handleSendMessage = async () => {};

  return (
    <ChatBox boxHeight={minimize}>
      <ChatHead minimizeValue={minimize} setMinimizeValue={setMinimize} />
      {status === 'authenticated' ? (
        <React.Fragment>
          <ChatBody  chatHistory={chatHistory} selectedConversation={undefined} />
          <ChatSendButton
            handleContentChange={handleContentChange}
            handleSendMessage={handleSendMessage}
          />
        </React.Fragment>
      ) : (
        <AuthScreen />
      )}
    </ChatBox>
  );
};

export default UserChat;
