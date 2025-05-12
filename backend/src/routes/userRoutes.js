const router = require('express').Router();
const { registerUser, readUser, updateUser, deleteUser, allUsers, loginUser } = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');


// testing ratelimiter route
router.get('/', (req, res) => {
    res.status(200).send({message:"Received Request"});
});

router.post('/create', registerUser);
router.post('/verify', loginUser)
router.get('/read/:email', authMiddleware, readUser);
router.put('/update', authMiddleware, updateUser);
router.delete('/delete/:user_id', authMiddleware, deleteUser);
router.get('/count', authMiddleware, allUsers);

module.exports = router;