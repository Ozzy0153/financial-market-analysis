const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.cookies.token || '';
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to request object

        // Then, check if the user has an 'admin' role
        if (req.user.role !== 'admin') {
            return res.status(403).send('Access denied. You do not have the required permissions.');
        }

        next(); // User is an admin, so continue to the next middleware
    } catch (error) {
        // Token verification failed
        res.status(400).send('Invalid token.');
    }
};

module.exports = isAdmin;
