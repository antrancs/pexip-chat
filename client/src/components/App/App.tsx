import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import './App.css';
import JoinPage from '../JoinPage/JoinPage';
import ChatPage from '../ChatPage/ChatPage';
import WebSocketClientContext from '../../context/WebSocketClientContext';
import AppContext from '../../context/AppContext';

const client = new W3CWebSocket('ws://127.0.0.1:8080');

const App = () => {
  const [userName, setUserName] = useState('');
  const hasJoined = userName.trim().length > 0;

  useEffect(() => {
    client.onopen = () => {
      console.log('Client connected');
    };
  }, []);

  function handleLogin(userName: string) {
    setUserName(userName);

    client.send(
      JSON.stringify({
        payload: {
          userName,
          date: Date.now()
        },
        type: 'USER_JOIN'
      })
    );
  }

  return (
    <AppContext.Provider value={{ userName }}>
      <WebSocketClientContext.Provider value={client}>
        <div className="App">
          <header></header>

          <main>
            {hasJoined ? (
              <ChatPage userName={userName} />
            ) : (
              <JoinPage onSubmit={handleLogin} />
            )}
          </main>
        </div>
      </WebSocketClientContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
