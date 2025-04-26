const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

pool.getConnection((err, connection) => {
    if(err) {
        console.error("Database Connection Failed: ", err);
        process.exit(1);
    }
    console.log("Database Connected Successfully!");
    connection.release();
});

app.listen(PORT, () => { console.log(`Server running: http://localhost:${PORT}`); });