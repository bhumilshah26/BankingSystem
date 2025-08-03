const router = require('express').Router();
const { registerUser, readUser, updateUser, deleteUser, allUsers, loginUser, requestPasswordReset, resetPassword, verifyResetToken, changePassword } = require('../controllers/userControllers');
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

// Password reset routes
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.get('/verify-reset-token/:token', verifyResetToken);

// Password change route (for logged-in users)
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;