const router = require('express').Router();
const { createUser, readUser, updateUser, deleteUser, allUsers, verifyUser } = require('../controllers/userControllers')

router.post('/create', createUser);
router.post('/verify', verifyUser)
router.get('/read/:email', readUser);
router.put('/update', updateUser);
router.delete('/delete/:user_id', deleteUser);
router.get('/count', allUsers);

module.exports = router;