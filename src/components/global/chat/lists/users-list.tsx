import moment from 'moment';
import { useSession } from 'next-auth/react';
import UserProfile from '../../users/profile';
import React, { useState, useEffect } from 'react';
import { getUserById } from '@/utils/outerbase-req/users';
import { ConversationProps, MessageProps, User } from '@/interface';
import { getLastMessageByUserId } from '@/utils/outerbase-req/chat';

interface Props {
  setSelectedConversation: React.Dispatch<string>;
  conversation: ConversationProps;
}

const ChatUsersList = ({ setSelectedConversation, conversation }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  const [lastMessage, setLastMessage] = useState<MessageProps | undefined>();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  useEffect(() => {
    const isAdmin = currentUser?.id === conversation?.admin_id;
    const displayOtherUser = isAdmin
      ? conversation?.user_id
      : conversation?.admin_id;

    if (displayOtherUser) {
      setLoading(true);

      const fetchData = async () => {
        try {
          const user = await getUserById(displayOtherUser);
          setUser(user);

          const lastMessage = await getLastMessageByUserId(user.id);
          setLastMessage(lastMessage);

          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [conversation.user_id]);

  return (
    <div
      title={user?.name}
      onClick={() => setSelectedConversation(conversation.id)}
      className='w-full'
    >
      <span className='w-full flex items-center gap-2 py-2.5'>
        <span className='w-full flex items-start justify-between'>
          <span className='flex items-start gap-2 pl-2'>
            {user && <UserProfile user={user} />}
            <span className='inline-flex flex-col m-0 p-0'>
              <span>{user?.name}</span>
              <p className='text-xs text-gray-400 mt-1'>
                {lastMessage?.text && lastMessage?.text.length > 20
                  ? `${lastMessage?.text.slice(0, 28)}...`
                  : lastMessage?.text}
              </p>
            </span>
          </span>
          <span className='text-[12px] text-gray-300'>
            {moment(conversation.created_at).format('LT')}
          </span>
        </span>
      </span>
    </div>
  );
};

export default ChatUsersList;
