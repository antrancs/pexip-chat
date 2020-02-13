import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useState
} from 'react';
import classnames from 'classnames';

import ChatTab from '../ChatTab/ChatTab';
import WebSocketClientContext from '../../context/WebSocketClientContext';
import ParticipantsList from '../ParticipantTab/ParticipantsList';
import './ChatPage.css';
interface IProps {
  userName: string;
}

export interface ChatItem {
  user: string;
  date: number;
  text: string;
  id: string;
  edited: boolean;
  deleted: boolean;
}

const ChatPage: FunctionComponent<IProps> = ({ userName }) => {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(1);

  const wsClient = useContext(WebSocketClientContext);

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
            date: data.payload.date,
            user: 'Meetingbot',
            text: `${data.payload.userName} has joined the chat`,
            id: `U${Date.now()}`,
            edited: false,
            deleted: false
          }
        ]);

        setUsers(data.users);
      } else if (data.type === 'UPDATE_MESSAGE') {
        setChatItems(messages =>
          messages.map(message => {
            if (message.id === data.payload.messageId) {
              return {
                ...message,
                text: data.payload.newText,
                edited: true
              };
            }
            return message;
          })
        );
      } else if (data.type === 'DELETE_MESSAGE') {
        setChatItems(messages =>
          messages.map(message => {
            if (message.id === data.payload.messageId) {
              return {
                ...message,
                text: 'The message has been deleted',
                deleted: true
              };
            }
            return message;
          })
        );
      }
    };
  }, [wsClient]);

  return (
    <div className="chat-page__container">
      <div className="chat-page__chat-card">
        <div className="chat-page__tabs">
          <div
            role="tab"
            onClick={() => setActiveTab(0)}
            className={classnames('chat-page__tab', {
              'chat-page__tab--active': activeTab === 0
            })}
          >
            Participants ({users.length})
          </div>
          <div
            role="tab"
            onClick={() => setActiveTab(1)}
            className={classnames('chat-page__tab', {
              'chat-page__tab--active': activeTab === 1
            })}
          >
            Chat
          </div>
        </div>

        {activeTab === 0 ? (
          <ParticipantsList users={users} />
        ) : (
          <ChatTab chatItems={chatItems} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
