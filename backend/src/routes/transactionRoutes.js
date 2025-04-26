const router = require('express').Router();
const { addtransaction } = require('../controllers/transactionControllers');

router.post('/add', addtransaction);

module.exports = router