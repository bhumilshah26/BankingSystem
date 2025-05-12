const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

    if(!token)
        return res.status(401).send('Access Denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains the payload u originally signed using with (user_id and email)
        next();
    } catch(err) { return res.status(400).send('Invalid Token!'); }
}

module.exports = authMiddleware;