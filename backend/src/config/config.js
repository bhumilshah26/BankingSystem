// Central configuration module.
// Loads variables from the backend `.env` file once and exposes them as a
// single typed object so the rest of the app never reads process.env directly.
require('dotenv').config();

const config = {
    // Server
    port: process.env.PORT || 5000,

    // Auth
    jwtSecret: process.env.JWT_SECRET,

    // Frontend (used for password-reset links / CORS)
    frontendUrl: process.env.FRONTEND_URL,

    // Mailer (Gmail app password)
    mail: {
        user: process.env.MAIL_USER,
        pass: process.env.APP_PASS,
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
    },

    // PostgreSQL (Neon). Prefer a single connection string (DATABASE_URL),
    // and fall back to the individual PG* variables for local development.
    db: {
        connectionString: process.env.DATABASE_URL,
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        // Neon requires SSL. rejectUnauthorized:false works with their managed certs.
        ssl: { rejectUnauthorized: false },
        max: 10,        // max connections in the pool
    },
};

module.exports = config;
