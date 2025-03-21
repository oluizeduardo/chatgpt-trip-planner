require('dotenv').config();
const express = require('express');
const path = require('path');
const xss = require('xss-clean');

const tripsRoutes = require('../routes/tripsRoute');

const app = express();

// Prevent cross site scripting.
app.use(xss());
// Middleware to process form data
app.use(express.urlencoded({ extended: true }));
// Serves static files from public folder.
app.use('/', express.static(path.join(__dirname, '../../public')));

app.use('/trips', tripsRoutes);

// Prevents the browser from storing pages in the cache.
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../../public/not-found.html'));
});

module.exports = app;
