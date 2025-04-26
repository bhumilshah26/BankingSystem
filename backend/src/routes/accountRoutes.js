const router = require('express').Router()
const { createAccount, readAccount, deleteAccount } = require('../controllers/accountControllers')

router.post('/create', createAccount)
router.get('/read', readAccount)
router.delete('/delete', deleteAccount)

module.exports = router