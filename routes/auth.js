const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('All fields are required');
        }
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        }
        user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid Credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid Credentials');
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true, secure: true });
        const redirectUrl = user.role === 'admin' ? '/admin' : '/main';
        res.redirect(redirectUrl);

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
