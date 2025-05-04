const router = require('express').Router()
const { createAccount, readAccount, deleteAccount, allaccounts } = require('../controllers/accountControllers')

router.post('/create', createAccount);
router.get('/read', readAccount);
router.delete('/delete', deleteAccount);
router.get('/allaccounts/:user_id', allaccounts);

module.exports = router