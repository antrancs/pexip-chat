import React, { FunctionComponent } from 'react';
import ChatTab from '../ChatTab/ChatTab';

interface IProps {
  userName: string;
}

const ChatPage: FunctionComponent<IProps> = ({ userName }) => {
  return (
    <div>
      <ChatTab />
    </div>
  );
};

export default ChatPage;
