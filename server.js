
var express = require('express');
require('express-async-errors');
var app = express();
var bodyP = require('body-parser');
var session = require('express-session');
var User = require('./User').User;



app.use(bodyP.urlencoded({ extended: false }));
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
}));

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: app,
    noCache: true,
});

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    useNullAsDefault:true,
    debug: true,
});
const http = require('http');
const ws = require('ws');

app.use(express.static('public'));

const connected_users = {};

// We attach express and ws to the same HTTP server
const server = http.createServer(app);
/*const wsserver = new ws.Server({ 
  server: server,
});*/
var sess_storage = session({ 
    secret: "12345",
    resave: false,
    saveUninitialized: false,
});
app.use(sess_storage);
var wsserver = new ws.Server({ 
    server: server,

    verifyClient: function(info, next) {
        sess_storage(info.req, {}, function(err) {
            if (err) {
                next(false, 500, "Error: " + err);
            } else {
                // Pass false if you want to refuse the connection
                next(true);
            }
        });
    },
});

// We define the WebSocket logic
  wsserver.on('connection', (wsconn) => { 
                                                
  console.log('Received new WS connection');
                                             
                                             
  //console.log("i'm0 "+this.login);
 // console.log("i'm "+myuser);
  //console.log("i'm here  "+connected_users[this.login]);
  let myuser = null;
  wsconn.on('message', (data) => {
      const parsed = JSON.parse(data);
        //console.log(parsed);
        switch (parsed.type) {
        case 'new_connection':
        var myuser = new User(this.login,wsconn);
        connected_users[this.login] = myuser ;
        //const username= parsed.username;  console.log("username: "+username); 
            
        //connected_users[username] = myuser = new User(username, wsconn);
        // We notify each user
        wsserver.broadcastList();
        break;
      case 'challenge':
        // We check that the invitation is valid
        const opponent = connected_users[this.login];
        if (opponent && myuser.invite(opponent)) {
          // We notify each user
          opponent.wsconn.send(JSON.stringify({
            type: 'challenge',
            username: myuser.login,
          }));
          wsconn.send(JSON.stringify({
            type: 'challenge',
            username: opponent.login,
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
  
    // Function to broadcast the list of conneted users
wsserver.broadcastList = () => {
  //console.log('ça marche le broadcast');
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

  wsconn.on('close', () => {
    if (myuser !== null) {
      delete connected_users[myuser.login];
      wsserver.broadcastList();
    }
  });
});

app.use('/', express.static('public'));

app.get('/', function(request, response) {
  //response.render('index.html');
  response.redirect('/login');
});
// gestionnire qui gere la liste des utilisateurs 
app.get('/userlist', async (req, res) => {   
  console.log('list session login '+ req.session.login);  
  console.log('list session pass '+ req.session.pass);
 /* if (req.session.login) {
    try {
      res.render('userlist.html', { 
        users: await knex('users'),
        current: req.session.login,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  } else {
    res.redirect('/login');
  }*/
  res.render('userlist.html');
});

// pour l'inscription
app.get('/signin', (req, res) => {
  res.render('signin.html');
});

app.post('/signin', async (req, res) => {
  var data = {
    login: req.body.login,
    pass: req.body.pass,
    email: req.body.email,
    //color2: req.body.color2,
  };
  //console.log('d login '+data.login);
  //console.log('d pass '+data.pass);
  //console.log('d email '+data.email);
  try {
    if (data.login 
        && data.pass
        && data.email
        && await knex('users').insert(data)) {
      res.redirect('/login');
    } else {
      res.render('signin.html', { data: data, message: 'Mauvaise donnée' });
    }
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      res.render('signin.html', { data: data, message: 'vous etes inscrit' });
    } else {
      console.error(err);
      res.status(500).send('Error');
    }
  }
});

// for the signin
app.get('/login', (req, res) => { 
  console.log('ici session login '+ req.session.login); 
  console.log('ici session pass '+ req.session.pass);
  if (req.session.login) {
    res.redirect('/userlist');
  } else {
    res.render('login.html');
  }
});

app.post('/login', async (req, res) => {console.log('req.body.login '+req.body.login); console.log('req.body.passs '+req.body.pass); console.log('req.body.login '+req.body.email);
  var user = await knex('users').where({
    login: req.body.login,
    pass: req.body.pass,
    //email:req.body.email,
  }).first();
  if (user) {
    req.session.login = user.login;  
    req.session.pass= user.pass; console.log('session login '+ req.session.login);  console.log('session pass '+ req.session.pass);
    res.redirect('/userlist');
  } else {
    res.render('login.html', { 
      login: req.body.login,
      message: 'Mot de passe ou login incorrect',
    });
  }
});

// for the logout 
app.get('/logout', (req, res) => {
  req.session.login = null;
  res.redirect('/login');
});
// Watch out for this: app.listen would break ws!
server.listen(process.env.PORT);