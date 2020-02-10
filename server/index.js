const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });

// store all users as an object to quickly remove later
const users = {};

wsServer.on('connection', webSocket => {
  webSocket.on('message', data => {
    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        const dataObj = JSON.parse(data);

        if (dataObj.type === 'USER_JOIN') {
          users[dataObj.payload.userName] = dataObj.payload;

          client.send(
            JSON.stringify({
              ...dataObj,
              users
            })
          );
        } else {
          client.send(data);
        }
      }
    });
  });
});
