var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    useNullAsDefault: true,
    debug: true,
});

async function init() {
  await knex.schema.dropTableIfExists('users');

  await knex.schema.createTable('users', (table) => {
    table.string('login').primary();
    table.string('pass').notNullable();
    table.string('email').notNullable();
    
  });
  
  var cols = await knex('users').columnInfo();
  console.log('Columns:', cols);
  
  await knex('users').insert({ login: 'foo', pass: 'foofoo', email: 'foo@gmail.com'});
  await knex('users').insert({ login: 'bar', pass: 'barbar', email: 'bar@gmail.com' });
  await knex('users').insert({ login: 'aaa', pass: 'aaaaaa', email: 'aaa@gmail.com' });
  
  var rows = await knex('users');
  console.log('Rows:', rows);

  await knex.destroy();
}
init();
