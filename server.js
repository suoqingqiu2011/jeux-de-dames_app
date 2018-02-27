var express = require('express');
var app = express();
var bodyP = require('body-parser');
var session = require('express-session');

app.use('/public', express.static('public'));
app.use(bodyP.urlencoded({ extended: false }));

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: app
});

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

app.get('/', (req, res) => {
});

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
  }
  try {
    if (data.login && data.password) {
      await knex('users').insert(data);
    }
  } catch (err) {
    if (err.code == 'SQLITE_CONSTRAINT') {
      res.send('signin', { data: data, message: 'Login already taken' });
    }
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get('/logout', (req, res) => {
});

app.get('/userlist', async (req, res) => {
  try {
    res.render('userlist.html', { users: await knex('users') });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
