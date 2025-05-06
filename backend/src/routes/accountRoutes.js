const router = require('express').Router()
const { createAccount, readAccount, deleteAccount, allaccounts, accountstatements } = require('../controllers/accountControllers')

router.post('/create', createAccount);
router.get('/read', readAccount);
router.delete('/delete', deleteAccount);
router.get('/allaccounts/:user_id', allaccounts);
router.get('/accountstatement/:account_number', accountstatements);

module.exports = router