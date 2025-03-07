require('dotenv').config();
const express = require('express');
const path = require('path');

const tripsRoutes = require('./src/api/routes/tripsRoute');

const app = express();

// Middleware to process form data
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/src/public')));

app.use('/trips', tripsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}.`));
