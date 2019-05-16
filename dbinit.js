var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

async function init() {
  await knex.schema.dropTableIfExists('users');

  await knex.schema.createTable('users', (table) => {
    table.string('login').primary();
    table.string('pass').notNullable();
    table.string('email');
    table.string('color1', 10);
    table.string('color2', 10);
  });
  
  var cols = await knex('users').columnInfo();
  console.log('Columns:', cols);
  
  await knex('users').insert({ login: 'foo', pass: '12345', email: 'Foo', color1: '#a30', color2: '#f10' });
  await knex('users').insert({ login: 'bar', pass: 'superman', email: 'Bar', color1: '#aa0', color2: '#401' });
  
  var rows = await knex('users');
  console.log('Rows:', rows);

  await knex.destroy();
}
init();
