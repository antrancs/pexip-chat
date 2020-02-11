import { createContext } from 'react';
import { w3cwebsocket } from 'websocket';

const WebSocketClientContext = createContext<w3cwebsocket>(
  new w3cwebsocket('ws://127.0.0.1:9000')
);

export default WebSocketClientContext;
