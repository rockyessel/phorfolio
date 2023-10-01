import DashboardLayout from '@/components/dashboard/layout';
import ChatUsersList from '@/components/global/chat/lists/users-list';
import axios from 'axios';
import React from 'react';
import Pusher from 'pusher-js';
import { IdGen } from '@/utils/helpers';
import { useSession } from 'next-auth/react';
import { FiMoreVertical } from 'react-icons/fi';
import StateLoader from '@/components/global/loader';
import { createMessage } from '@/utils/outerbase-req/chat';
import MegaBox from '@/components/global/chat/mega/mega-box';
import ChatSendButton from '@/components/global/chat/send-button';
import MegaHeader from '@/components/global/chat/mega/mega-header';
import { ConversationProps, MessageProps, User } from '@/interface';
import BodyWrapper from '@/components/global/chat/mega/body-wrapper';
import UserChatWithTimestamp from '@/components/global/chat/user-timestamp';

const MassagePageBox = () => {
  const [conversations, setConversations] = React.useState<ConversationProps[]>();
  const [messages, setMessages] = React.useState<MessageProps[]>();
  const [selectedConversation, setSelectedConversation] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const [messageInput, setMessageInput] = React.useState<string>('');

  const { data: session } = useSession();
  const user = { ...session?.user } as User;

  const getRoomMessage = async (conversationId: string) => {
    const { data } = await axios.get<{ response: { items: MessageProps[] } }>(
      `https://minimum-aqua.cmd.outerbase.io/chat/message/get/conversationId?conversationId=${conversationId}`
    );
    return data.response.items;
  };

  // Subscribe to a conversation-specific channel when a conversation is selected
  React.useEffect(() => {
    if (selectedConversation) {
      setLoading(true);
      getRoomMessage(selectedConversation).then((messages) => {
        setMessages(messages);
        setLoading(false);
      });
      // Subscribe to the conversation-specific channel
      const unsubscribe = subscribeToConversation(selectedConversation);
      return () => {
        unsubscribe(); // Unsubscribe when the component unmounts or the conversation changes
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation]);

  // Get the list of every conversation related to the admin
  const getConversations = async () => {
    const { data } = await axios.get<{response: { items: ConversationProps[] }}>(
      `https://minimum-aqua.cmd.outerbase.io/chat/messages/subdomain?subdomain=gameouut`
    );
    return data.response.items;
  };

  // Initialize the getConversation async function.
  React.useEffect(() => {
    getConversations().then((conversations) => setConversations(conversations));
  }, []);

  // Subscribe to a conversation-specific channel using Pusher
  const subscribeToConversation = (conversationId: string) => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    const channel = pusher.subscribe(`chat-${conversationId}`);

    channel.bind('message', async (data: { message: string }) => {
      // Handle new messages for the selected conversation
      if (conversationId === selectedConversation) {
        const msg: MessageProps = {
          id: IdGen('MESSAGE'),
          conversation_id: conversationId,
          sender_id: user.id,
          text: data.message,
          created_at: new Date().toISOString(),
        };

        setMessages((prevMessages) => {
          if (prevMessages) {
            return [...prevMessages, msg];
          }
        });

        await createMessage(msg);
      }
    });

    return () => {
      channel.unbind('message');
      pusher.unsubscribe(`chat-${conversationId}`);
    };
  };


  const sendMessage = async () => {
    try {
      if (messageInput.trim()) {
        await axios.post('/api/send-message', { message: messageInput, conversation_id: selectedConversation });
        setMessageInput('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  return (
    <DashboardLayout styles='w-full flex items-center'>
      <div className='w-full flex h-screen antialiased'>
        <div className='flex flex-row h-full w-full overflow-hidden'>
          <div className='flex flex-col divide-y-[1px] divide-rose-700 px-4 pt-4 flex-shrink-0 border-r-[1px]'>
            <div className='flex flex-row items-center justify-center h-12 w-full'>
              <div className='w-full flex items-center justify-between gap-2'>
                <div className='flex-1'>
                  <fieldset className='relative flex items-center'>
                    <fieldset className='absolute'>
                      <FiMoreVertical className='mx-3 w-5 h-5' />
                    </fieldset>
                    <input
                      placeholder={'Search for a user...eg rockyessel'}
                      type='text'
                      name={'Search Users'}
                      className='w-full py-2.5 pr-5 bg-transparent border border-rose-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    />
                  </fieldset>
                </div>

                <span className='p-1 text-lg hover:bg-rose-700 bg-rose-700 cursor-pointer bg-opacity-50 rounded-full'>
                  <FiMoreVertical />
                </span>
              </div>
            </div>

            <div className='flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto'>
              {conversations?.map((conversation, index) => (
                <ChatUsersList
                  key={index}
                  conversation={conversation}
                  setSelectedConversation={setSelectedConversation}
                />
              ))}
            </div>
          </div>

          <div className='flex flex-grow flex-col w-full h-full'>
            {selectedConversation === '' ? (
              <p>Default Screen</p>
            ) : loading ? (
              <div className='w-full h-full flex items-center justify-center gap-2'>
                <StateLoader styles='text-2xl' />
                <p>Loading Messages...</p>
              </div>
            ) : (
              <BodyWrapper>
                <MegaHeader
                  user={user}
                  selectedConversation={selectedConversation}
                />
                <MegaBox>
                  {messages?.map((message, index) => (
                    <UserChatWithTimestamp message={message} key={index} />
                  ))}
                </MegaBox>
                <ChatSendButton
                  messageInput={messageInput}
                  handleChange={handleChange}
                  sendMessage={sendMessage}
                />
              </BodyWrapper>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MassagePageBox;
