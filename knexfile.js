// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 const pg = require('pg')
 require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
  },
};

