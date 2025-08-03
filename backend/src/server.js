const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT;

pool.getConnection((err, connection) => {
    if(err) {
        process.exit(1);
    }
    connection.release();
});

app.listen(PORT, () => {  });