require('dotenv').config();
const logger = require('./src/backend/logger/logger');
const app = require('./src/backend/api/api');
const packageJson = require('./package.json');

const port = process.env.PORT || 3000;

const appVersion = packageJson.version;

app.listen(port, () =>
  logger.info(`TripPlanner [v${appVersion}] running on port [${port}].`)
);
