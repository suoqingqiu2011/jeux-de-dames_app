const http = require('http');
const ws = require('ws');
const express = require('express');
const User = require('./lib').User;

const app = express();
app.use(express.static('public'));

const connected_users = {};

// We attach express and ws to the same HTTP server
const server = http.createServer(app);
const wsserver = new ws.Server({ 
  server: server,
});

// Function to broadcast the list of conneted users
wsserver.broadcastList = () => {
  wsserver.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({
          type: 'userlist',
          // We must avoid calling JSON.stringify on the wsconn field
          // of each user
          userlist: Object.values(connected_users).map((u) => u.serialize()),
        }));
    }
  });
};

// We define the WebSocket logic
wsserver.on('connection', (wsconn) => {
  console.log('Received new WS connection');
  let myuser = null;
  
  wsconn.on('message', (data) => {
    const parsed = JSON.parse(data);
    console.log(parsed);
    switch (parsed.type) {
      case 'new_connection':
        const name = parsed.username;
        connected_users[name] = myuser = new User(name, wsconn);
        wsserver.broadcastList();
        break;
      case 'challenge':
        // We check that the invitation is valid
        const opponent = connected_users[parsed.username];
        if (opponent && myuser.invite(opponent)) {
          // We notify each user
          opponent.wsconn.send(JSON.stringify({
            type: 'challenge',
            username: myuser.name,
          }));
          wsconn.send(JSON.stringify({
            type: 'challenge',
            username: opponent.name,
          }));
          wsserver.broadcastList();
        } else {
          // We send back an error
          wsconn.send(JSON.stringify({
            type: 'challenge_rejected',
            username: parsed.username,
          }));
        }
        break;
      case 'quit':
        const game = myuser.quit();
        if (game) {
          for (let p of ['player1', 'player2']) {
            game[p].wsconn.send(JSON.stringify({
              type: 'quit',
            }));
          }
          wsserver.broadcastList();
        } else {
          wsconn.send(JSON.stringify({
            type: 'error',
            message: 'Cannot quit',
          }));
        }
      default:
        console.error('Bad message', parsed);
    }  
  });
  
  wsconn.on('close', () => {
    if (myuser !== null) {
      delete connected_users[myuser.name];
      wsserver.broadcastList();
    }
  });
});

// Watch out for this: app.listen would break ws!
server.listen(process.env.PORT);
