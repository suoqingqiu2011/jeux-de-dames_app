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
    table.string('email').notNullable();
    table.string('color2', 15);
  });
  
  var cols = await knex('users').columnInfo();
  console.log('Columns:', cols);
  
  
  var rows = await knex('users');
  console.log('Rows:', rows);

  await knex.destroy();
}
init();
