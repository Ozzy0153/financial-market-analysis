const express = require('express');
const bcrypt = require('bcryptjs');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User');
const MarketInfo = require('../models/MarketInfo');
const router = express.Router();

router.get('/admin', isAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        const marketInfos = await MarketInfo.find({});
        res.render('admin', { users, marketInfos });
    } catch (error) {
        console.error('Error loading admin page:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add-user', isAdmin, async (req, res) => {
    try {
        const { username, password, role } = req.body;
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user = new User({
            username,
            password: hashedPassword,
            role
        });
        await user.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit-user', isAdmin, async (req, res) => {
    try {
        const { userId, username, role } = req.body;
        const user = await User.findByIdAndUpdate(userId, { username, role }, { new: true });
        if (!user) {
            return res.status(404).send('User not found.');
        }
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete-user', isAdmin, async (req, res) => {
    await User.findByIdAndDelete(req.body.userId);
    res.redirect('/admin');
});

module.exports = router;
