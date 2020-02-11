import React, {
  useContext,
  useEffect,
  useState,
  FunctionComponent
} from 'react';

import ChatListItem from '../ChatItem/ChatListItem';
import WebSocketClientContext from '../../context/WebSocketClientContext';

interface IProps {
  userName: string;
}

export interface ChatItem {
  user: string;
  date: number;
  text: string;
}

const ChatPage: FunctionComponent<IProps> = ({ userName }) => {
  const wsClient = useContext(WebSocketClientContext);
  const [text, setText] = useState('');
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);

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
        {chatItems.map((item, index) => (
          <ChatListItem key={index} item={item} />
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

export default ChatPage;
