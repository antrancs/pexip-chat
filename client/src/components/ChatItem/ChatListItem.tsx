import React, { FunctionComponent } from 'react';

import './ChatItem.css';
import { ChatItem } from '../ChatPage/ChatPage';

interface IProps {
  item: ChatItem;
}

const ChatListItem: FunctionComponent<IProps> = ({ item }) => {
  const { date, user, text } = item;

  const dateObj = new Date(date);
  const formattedDate = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  return (
    <div>
      <div>
        <span className="chat-item__name">{user}</span>{' '}
        <span className="chat-item__date">{formattedDate}</span>
      </div>

      <p className="chat-item__text">{text}</p>
    </div>
  );
};

export default ChatListItem;
