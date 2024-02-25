require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes');
const marketInfoRoutes = require('./routes/marketInfo');
const app = express();
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: __dirname + '/locales/{{lng}}/translation.json',
        },
        detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
        },
    });

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', adminRoutes);
app.use('/marketInfo', marketInfoRoutes);

const authMiddleware = require('./middleware/authMiddleware');
const isAdmin = require('./middleware/isAdmin');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

app.use(express.json());
app.use(middleware.handle(i18next));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('start', );
});

app.get('/language/:lng', (req, res) => {
    res.cookie('i18next', req.params.lng);
    res.redirect('back');
});


app.get('/api/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route, you are authenticated!');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});


app.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard');
});

app.get('/api/currency-rates', async (req, res) => {
    try {
        const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_RATES_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching currency rates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/stocks', (req, res) => {
    res.render('stocks', { stockData: {} });
});

app.get('/main', (req, res) => {
    res.render('main', {
        i18n: req.i18n
    });
});


app.get('/admin', isAdmin, async (req, res) => {
    const users = await User.find({});
    res.render('admin', { users });
});

app.get('/api/stocks', async (req, res) => {
    const symbols = req.query.symbol.split(',');
    let data = [];
    for (let symbol of symbols) {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol.trim()}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`);
            data.push(response.data);
        } catch (error) {
            console.error(`Error fetching stock data for ${symbol}:`, error);
        }
    }
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
