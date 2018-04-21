var express = require('express');
var app = express();
var bodyP = require('body-parser');
var session = require('express-session');

app.use('/public', express.static('public'));
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
    debug: true,
});

// Part 4

app.get('/userlist', async (req, res) => {
  if (req.session.user) {
    try {
      res.render('userlist.html', { 
        users: await knex('users'),
        current: req.session.user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  } else {
    res.redirect('/');
  }
});


// Part 5

app.get('/signin', (req, res) => {
  res.render('signin.html');
});

app.post('/signin', async (req, res) => {
  var data = {
    login: req.body.login,
    pass: req.body.password,
    name: req.body.name,
    color1: req.body.color1,
    color2: req.body.color2,
  };
  try {
    if (data.login 
        && data.pass
        && await knex('users').insert(data)) {
      res.redirect('/');
    } else {
      res.render('signin.html', { data: data, message: 'Bad data' });
    }
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      res.render('signin.html', { data: data, message: 'Login already taken' });
    } else {
      console.error(err);
      res.status(500).send('Error');
    }
  }
});


// Part 6

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/userlist');
  } else {
    res.render('login.html');
  }
});

app.post('/', async (req, res) => {
  var user = await knex('users').where({
    login: req.body.login,
    pass: req.body.password,
  }).first();
  if (user) {
    req.session.user = user;
    res.redirect('/userlist');
  } else {
    res.render('login.html', { 
      login: req.body.login,
      message: 'Wrong login or password',
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

// Part 7
/* Work in progress
app.get('/sp', (req, res) => {
  res.render('singlepage.html');
});

app.get('/sp/userlist', async (req, res) => {
  try {
    res.send(await knex('users'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});
*/

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
