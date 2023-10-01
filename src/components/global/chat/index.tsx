import React from 'react';
import axios from 'axios';
import UserChat from './user';
import AdminChat from './admin';
import { User } from '@/interface';
import useSubdomain from '@/hooks/subdomain';
import { useSession } from 'next-auth/react';

const Chat = () => {
  const [conversations, setConversations] = React.useState<any[]>();
  const [messages, setMessages] = React.useState<any[]>();
  const [selectedConversation, setSelectedConversation] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const { data: session } = useSession();
  const subdomain = useSubdomain(0);
  const user = { ...session?.user } as User;

  const getRoomMessage = async (conversationId: string) => {
    const { data } = await axios.get<{ response: { items: any[] } }>(
      `https://minimum-aqua.cmd.outerbase.io/chat/message/get/conversationId?conversationId=${conversationId}`
    );
    return data.response.items;
  };

  React.useEffect(() => {
    if (selectedConversation) {
      getRoomMessage(selectedConversation).then((messages) => {
        setMessages(messages);
        setLoading(false);
      });
    }
  }, [selectedConversation]);

  const getConversations = async () => {
    const { data } = await axios.get<{ response: { items: any[] } }>(
      `https://minimum-aqua.cmd.outerbase.io/chat/conversation/get/admin?adminId=admin1`
    );
    return data.response.items;
  };
  
  React.useEffect(() => {
    getConversations().then((conversations) => setConversations(conversations));
  }, []);

  return (
    <section className='fixed bottom-0 right-0 flex items-end h-0 text-black'>
      {user.username === subdomain ? <AdminChat /> : <UserChat />}
    </section>
  );
};

export default Chat;
