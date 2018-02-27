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
});

app.get('/logout', (req, res) => {
});

app.get('/userlist', async (req, res) => {
  try {
    res.render('userlist.html', { users: await knex('users') });
  } catch (err) {
    res.status(500).send('Error');
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
