var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '*******',
        database: 'weather',
        charset: 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;