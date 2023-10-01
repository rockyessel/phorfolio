import React from 'react';
import ChatBox from '../box';
import ChatHead from '../head';
import ChatBody from '../body';
import ChatSendButton from '../send-button';

const AdminChat = () => {
  const [minimize, setMinimize] = React.useState('450');
  const [selectedConversation, setSelectedConversation] = React.useState<any>();
  const [chatHistory, setChatHistory] = React.useState<any>();
  React.useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        'https://minimum-aqua.cmd.outerbase.io/conversations'
      );

      const data = await response.json();
      console.log(data);
    };

    fetchUser()
      .then(() => console.log('Fetch done!'))
      .catch((error) => console.log(error));
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const sendMessage = () => {};

  return (
    <div>
      <ChatBox boxHeight={minimize}>
        <ChatHead minimizeValue={minimize} setMinimizeValue={setMinimize} />
        {selectedConversation ? (
          <React.Fragment>
            <ChatBody
              selectedConversation={selectedConversation}
              chatHistory={chatHistory}
            />
            <ChatSendButton
              handleChange={handleChange}
              sendMessage={sendMessage}
              messageInput={''}
            />
          </React.Fragment>
        ) : (
          // <ChatUsersList setSelectedConversation={setSelectedConversation} />
          <p> hello</p>
        )}
      </ChatBox>
    </div>
  );
};

export default AdminChat;
