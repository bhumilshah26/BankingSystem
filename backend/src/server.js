const app = require('./app');
const pool = require('./config/db');
const config = require('./config/config');

const PORT = config.port;

// Verify the database connection on startup.
console.log('Connecting to PostgreSQL (Neon)...');
pool.connect()
    .then(client => {
        client.release();
        console.log('Database connected successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });
