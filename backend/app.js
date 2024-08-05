const mongoose = require('mongoose');
const express = require('express');
const properties = require('./config/properties');
const db = require('./config/db');
const vinylRoutes = require('./routes/vinyl');
const artistRoutes = require('./routes/artist');
db();

const app = express();
app.use(express.json());

// Middleware to enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/vinyls', vinylRoutes);
app.use('/artist', artistRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/db-status', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database status: ${dbStatus}`);
});

app.listen(properties.PORT, properties.IP, () => {
    console.log(`Server is running on port ${properties.PORT}`);
});