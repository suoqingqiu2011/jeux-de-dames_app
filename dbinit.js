var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: ".data/db.sqlite3"
    },
    debug: true,
});

knex.schema.createTableIfNotExists('users', (table) => {
  table.string('login').primary();
  table.string('pass').notNullable();
});