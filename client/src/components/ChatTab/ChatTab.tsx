import React, { useState, useEffect, useContext } from 'react';

import WebSocketClientContext from '../../context/WebSocketClientContext';
import ChatListItem from '../ChatItem/ChatListItem';
import AppContext from '../../context/AppContext';

export interface ChatItem {
  user: string;
  date: number;
  text: string;
}

const ChatTab = () => {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [text, setText] = useState('');

  const wsClient = useContext(WebSocketClientContext);
  const { userName } = useContext(AppContext);

  useEffect(() => {
    wsClient.onmessage = message => {
      console.log(message);

      if (typeof message.data !== 'string') {
        return;
      }
      const data = JSON.parse(message.data);
      if (data.type === 'NEW_MESSAGE') {
        setChatItems(messages => [...messages, data.payload]);
      } else if (data.type === 'USER_JOIN') {
        setChatItems(messages => [
          ...messages,
          {
            ...data.payload,
            user: 'Meetingbot',
            text: `${data.payload.userName} has joined the chat`
          }
        ]);
      }
    };
  }, [wsClient]);

  function handleSend() {
    wsClient.send(
      JSON.stringify({
        payload: {
          user: userName,
          text,
          date: Date.now()
        },
        type: 'NEW_MESSAGE'
      })
    );

    setText('');
  }

  return (
    <div>
      <div>
        {chatItems.map(item => (
          <ChatListItem key={item.user} item={item} />
        ))}
      </div>

      <input
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatTab;
