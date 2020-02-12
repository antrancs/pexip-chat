import React, { FunctionComponent } from 'react';

import './ChatItem.css';
import { ChatItem } from '../ChatPage/ChatPage';

interface IProps {
  item: ChatItem;
}

const ChatListItem: FunctionComponent<IProps> = ({ item }) => {
  const { date, user, text } = item;

  const dateObj = new Date(date);

  function formatDate(date: Date) {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${hours <= 9 ? '0' + hours : hours}:${
      minutes <= 9 ? '0' + minutes : minutes
    }`;
  }

  const formattedDate = formatDate(dateObj);
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
