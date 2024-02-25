const express = require('express');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User');
const router = express.Router();

router.get('/admin', isAdmin, async (req, res) => {
    const users = await User.find({});
    res.render('admin', { users });
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