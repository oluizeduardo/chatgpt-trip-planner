require('dotenv').config();
const express = require('express');
const path = require('path');

const tripsRoutes = require('../routes/tripsRoute');

const app = express();

// Middleware to process form data
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../../public')));

app.use('/trips', tripsRoutes);

module.exports = app;
