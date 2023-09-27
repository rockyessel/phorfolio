import React from 'react';

interface Props {
  boxHeight: string;
  children: React.ReactNode;
}

const ChatBox = (props: Props) => {
  
  const styles = {
    height: `${props.boxHeight}px`,
    transition: 'height 0.5s ease-in-out',
    transitionDelay: '0.2s',
  };
  return (
    <div
      style={styles}
      className={`w-full md:w-[400px] border-[1px] mr-10 relative flex flex-col bottom-0 transition duration-1000 ease-out shadow-md rounded-t-lg bg-white`}
    >
      {props.children}
    </div>
  );
};

export default ChatBox;
