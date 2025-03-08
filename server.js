require('dotenv').config();
const logger = require('./src/backend/logger/logger');
const app = require('./src/backend/api/api');

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server running on ${port}.`));
