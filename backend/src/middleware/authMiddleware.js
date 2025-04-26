const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

    if(!token)
        return res.status(401).send('access Denies');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) { return res.status(400).send('Invalid Token!'); }
}

module.exports = authMiddleware