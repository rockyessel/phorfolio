import React from 'react';
import ChatBox from '../box';
import ChatHead from '../head';
import ChatBody from '../body';
import AuthScreen from '../auth-screen';
import ChatSendButton from '../send-button';
import { useSession } from 'next-auth/react';

const UserChat = () => {
  const [minimize, setMinimize] = React.useState('450');
  const [editableContent, setEditableContent] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState<any[]>();
  const [selectedUser, setSelectedUser] = React.useState<any>();

  const { status } = useSession();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const sendMessage = () => {};
  return (
    <ChatBox boxHeight={minimize}>
      <ChatHead minimizeValue={minimize} setMinimizeValue={setMinimize} />
      {status === 'authenticated' ? (
        <React.Fragment>
          <ChatBody
            chatHistory={chatHistory}
            selectedConversation={undefined}
          />
          <ChatSendButton
            handleChange={handleChange}
            sendMessage={sendMessage}
            messageInput={''}
          />
        </React.Fragment>
      ) : (
        <AuthScreen />
      )}
    </ChatBox>
  );
};

export default UserChat;
