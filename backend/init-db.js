// One-off script to create the schema (tables + trigger) on the configured
// PostgreSQL/Neon database. Run with:  npm run init-db
const fs = require('fs');
const path = require('path');
const pool = require('./src/config/db');

(async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        console.log('Applying schema.sql to the database...');
        await pool.query(sql);
        console.log('Schema applied successfully (tables + trigger created).');
    } catch (err) {
        console.error('Failed to apply schema:', err.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
})();
