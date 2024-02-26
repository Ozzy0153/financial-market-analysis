const express = require('express');
const MarketInfo = require('../models/MarketInfo');
const isAdmin = require('../middleware/isAdmin');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/add', [isAdmin, upload.array('images', 3)], async (req, res) => {
    try {
        const { names, descriptions } = req.body;
        const images = req.files.map(file => `/uploads/${file.filename}`);

        const marketInfo = new MarketInfo({
            images,
            names,
            descriptions
        });

        await marketInfo.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Market info add error:', error);
        res.status(500).send('Server error during market info addition');
    }
});

router.get('/', async (req, res) => {
    try {
        const marketInfos = await MarketInfo.find({});
        res.json(marketInfos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.put('/:id', [isAdmin, upload.array('images', 3)], async (req, res) => {
    try {
        const { names, descriptions } = req.body;
        let updateData = {
            names,
            descriptions,
            updatedAt: new Date()
        };

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => `/uploads/${file.filename}`);
        }

        await MarketInfo.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating market info:', error);
        res.status(500).send('Server error');
    }
});


router.delete('/:id', isAdmin, async (req, res) => {
    try {
        await MarketInfo.findByIdAndRemove(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.post('/edit/:id', [isAdmin, upload.array('images', 3)], async (req, res) => {
    const { id } = req.params;
    const { names, descriptions } = req.body;
    let update = {
        names: names,
        descriptions: descriptions,
    };
    if (req.files.length > 0) {
        update.images = req.files.map(file => `/uploads/${file.filename}`);
    }
    try {
        await MarketInfo.findByIdAndUpdate(id, update);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating market info:', error);
        res.status(500).send('Server error');
    }
});

router.post('/delete/:id', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await MarketInfo.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting market info:', error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
