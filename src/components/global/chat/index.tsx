import React from 'react';
// import { useSession } from 'next-auth/react';

import AdminChat from './admin';
import UserChat from './user';
import axios from 'axios';

export const dummyChatHistory = [
  {
    userId: 1,
    timestamp: '2023-09-18 10:15 AM',
    message: 'Hello, how can I help you?',
  },
  {
    userId: 2,
    timestamp: '2023-09-18 10:20 AM',
    message: 'I have a question about your products.',
  },
  {
    userId: 1,
    timestamp: '2023-09-18 10:22 AM',
    message: 'Sure, feel free to ask your question.',
  },
  {
    userId: 2,
    timestamp: '2023-09-18 10:25 AM',
    message: 'Do you offer free shipping?',
  },
  {
    userId: 1,
    timestamp: '2023-09-18 10:28 AM',
    message: 'Yes, we offer free shipping on orders over $50.',
  },
  {
    userId: 2,
    timestamp: '2023-09-18 10:30 AM',
    message: 'Great, thanks for the information!',
  },
];

const Chat = () => {
  // const [minimize, setMinimize] = React.useState('450');
  // const [editableContent, setEditableContent] = React.useState('');
  // const [chatHistory, setChatHistory] = React.useState<any[]>(dummyChatHistory);

  // const { status } = useSession();
  // console.log('status', status);

  // const handleContentChange = () => {};
  // const handleSendMessage = async () => {};

  return (
    <div className='fixed bottom-0 right-0 flex items-end h-0 text-black'>
      <AdminChat />
    </div>
  );
};

export default Chat;
