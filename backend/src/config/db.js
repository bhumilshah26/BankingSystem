const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  // only 10 users can have a database connection at once
  connectionLimit: 10,
  // how many other connections can wait in line while the active connections are busy
  queueLimit: 0
});

// promise is used to avoid (1. callbacks type) and use async and await(2. modern type)
// pool is a network of open connections that can be used so that the less costly, time consuming and server crashes
module.exports = pool.promise();
