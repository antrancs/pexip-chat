import React, { useState, useContext, FunctionComponent } from 'react';

import WebSocketClientContext from '../../context/WebSocketClientContext';
import ChatListItem from '../ChatItem/ChatListItem';
import AppContext from '../../context/AppContext';
import { ChatItem } from '../ChatPage/ChatPage';
import './ChatTab.css';

interface IProps {
  chatItems: ChatItem[];
}

const ChatTab: FunctionComponent<IProps> = ({ chatItems }) => {
  const [text, setText] = useState('');

  const wsClient = useContext(WebSocketClientContext);
  const { userName } = useContext(AppContext);

  function handleSend() {
    wsClient.send(
      JSON.stringify({
        payload: {
          user: userName,
          text,
          date: Date.now(),
          id: `U${Date.now()}`
        },
        type: 'NEW_MESSAGE'
      })
    );

    setText('');
  }

  function handleUpdate(messageId: string, newText: string) {
    wsClient.send(
      JSON.stringify({
        payload: {
          messageId,
          newText
        },
        type: 'UPDATE_MESSAGE'
      })
    );
  }

  function handleDelete(messageId: string) {
    wsClient.send(
      JSON.stringify({
        payload: {
          messageId
        },
        type: 'DELETE_MESSAGE'
      })
    );
  }

  return (
    <div className="chat-tab__container">
      <div className="chat-tab-messages">
        {chatItems.map(item => (
          <ChatListItem
            key={item.user}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="chat-tab__controls">
        <input
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
          className="chat-tab__input"
        />

        <button onClick={handleSend} className="chat-tab__send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatTab;
