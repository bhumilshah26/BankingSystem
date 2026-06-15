const { Pool } = require('pg');
const config = require('./config');

// A pool is a network of open connections that can be reused, so requests are
// less costly and we avoid exhausting the database / crashing under load.
// When DATABASE_URL is set (Neon), we connect with it directly; otherwise we
// fall back to the individual PG* fields for local development.
const pool = new Pool(
    config.db.connectionString
        ? {
            connectionString: config.db.connectionString,
            ssl: config.db.ssl,
            max: config.db.max,
        }
        : {
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
            port: config.db.port,
            ssl: config.db.ssl,
            max: config.db.max,
        }
);

module.exports = pool;
