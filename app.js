require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Import routes
const authRoutes = require('./routes/auth');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');

// Database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Middleware
app.use(express.json()); 

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('start');
});

app.get('/api/protected', authMiddleware, (req, res) => {
    // This route is protected, only accessible to authenticated users
    res.send('This is a protected route, you are authenticated!');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard');
});

// Define other routes here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
