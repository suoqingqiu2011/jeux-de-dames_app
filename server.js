

var express = require('express');
require('express-async-errors');
var app = express();
var bodyP = require('body-parser');
var session = require('express-session');
var User = require('./User').User;



app.use(bodyP.urlencoded({ extended: false }));

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

//app.use(express.static('public'));

const connected_users = {};

// express et ws sont au même HTTP server
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

//vouloir connecter au serveur
var wsserver = new ws.Server({ 
    server: server,

    verifyClient: function(info, next) {
        sess_storage(info.req, {}, function(err) {
            if (err) {
                next(false, 500, "Error: " + err);
            } else {
                // Passer false si tu veut refuser le connection 
                next(true);
            }
        });
    },
});

//  la fonction broadcast pour afficher la list de users connectes
wsserver.broadcastList = () => {
  wsserver.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) { console.log(connected_users);
      client.send(JSON.stringify({
          type: 'userlist',
          // We must avoid calling JSON.stringify on the wsconn field
          // of each user
          userlist: Object.values(connected_users).map((u) => u.serialize()),
        }));
    }
  });
};

// definir le WebSocket : recuperer le JSON au serveur et envoyer a tous les clients 
wsserver.on('connection', (wsconn) => {
  console.log('Received new WS connection');
  let myuser = null;
  
  wsconn.on('message', (data) => {
    const parsed = JSON.parse(data);
    console.log(parsed);   
    switch (parsed.type) {  
      case 'new_connection':
        const name = parsed.username;    console.log('name hereeeee');  console.log('parsed.username '+parsed.username);
        connected_users[name] = myuser = new User(name, wsconn );   
        wsserver.broadcastList();  console.log('name  '+name);
        break;
      case 'challenge':
        
        const opponent = connected_users[parsed.username];
        // l'invite est valide ou non
        if (opponent && myuser.invite(opponent)) {
          //passer des msg a tous les cotes de clients
          opponent.wsconn.send(JSON.stringify({
            type: 'challenge',
            username: myuser.login,
          }));
          wsconn.send(JSON.stringify({
            type: 'challenge',
            username: opponent.login,
          }));
          //wsserver.broadcastList();
          
        } else {
          // client ne peut pas choisir lui_meme 
          wsconn.send(JSON.stringify({
            type: 'challenge_rejected',
            username: parsed.username,
          }));
        }
        break;
      case 'chessBoard':
        const opponentt = connected_users[parsed.username];
        // l'invite est valide ou non
        if (opponentt && myuser.invite(opponent)) {
          //passer des msg a tous les cotes de clients
          opponentt.wsconn.send(JSON.stringify({
            type: 'chessBoard',
            username: myuser.login,
            myturn:  myuser.myturn,
            chessBoard: myuser.chessBoard,
            row:myuser.row,
            column:myuser.column,
          }));
          wsconn.send(JSON.stringify({
            type: 'chessBoard',
            username: opponentt.login,
            myturn:  opponentt.myturn,
            chessBoard: opponentt.chessBoard,
            row:opponentt.row,
            column:opponentt.column,
          }));
          //wsserver.broadcastList();    
        }
        
        break;
      // quitter le jeux
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
  //websocket est coupe
  wsconn.on('close', () => {
    if (myuser !== null) {
      delete connected_users[myuser.login];
      wsserver.broadcastList();
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
  

app.use('/', express.static('public'));

//retouner a la page principale pour login
app.get('/', function(request, response) {
  response.redirect('/login');
});

// gestionnire qui gere la liste des utilisateurs 
app.get('/userlist', async (req, res) => {   
  console.log('list session login '+ req.session.login);  
  console.log('list session pass '+ req.session.pass);
  if (req.session.login) {
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
  }
});

// pour l'inscription
app.get('/signin', (req, res) => {
  res.render('signin.html');
});

//inscrire des donnees
app.post('/signin', async (req, res) => {
  var data = {
    login: req.body.login,
    pass: req.body.pass,
    email: req.body.email,
  };
 
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

// verifier si on affichier userlist
app.get('/login', (req, res) => { 
  console.log('ici session login '+ req.session.login); 
  console.log('ici session pass '+ req.session.pass);
  if (req.session.login) {
    res.redirect('/userlist');
  } else {
    res.render('login.html');
  }
});
//login avec des bons usename et password
app.post('/login', async (req, res) => {console.log('req.body.login '+req.body.login); console.log('req.body.passs '+req.body.pass); console.log('req.body.login '+req.body.email);
  var user = await knex('users').where({
    login: req.body.login,
    pass: req.body.pass,
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
//charger le jeux
app.get('/jeux', (req, res) => {
  if (req.session.login) {
    res.render('index.html');
  }else{
    res.redirect('/login');
  }
});

// logout du jeux
app.get('/logout', (req, res) => {
  req.session.login = null;
  res.redirect('/login');
});

// si app.listen est coupe, me montre des msg 
server.listen(process.env.PORT);