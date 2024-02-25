const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.cookies.token || '';
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== 'admin') {
            return res.status(403).send('Access denied. You do not have the required permissions.');
        }
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = isAdmin;
