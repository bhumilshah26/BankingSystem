const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// Routes
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes')
const transferRoutes = require('./routes/transferRoutes')

const app = express()
app.use(cors())
app.use(express.json())


// adding a limit to the number of requests per user
// maybe use a redis store (rate-limit-redis)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins window
    max: 100, // 100 requests per 15 min window
    message: "Too many requests, wait for some time.",
});

app.use(limiter);

app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);
app.use('/transfers', transferRoutes);

module.exports = app;