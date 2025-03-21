const { createTrip } = require('../service/chatgptService');
const logger = require('../logger/logger');
const path = require('path');
const fs = require('fs');

class TripController {
  static createNewTrip = async (req, res) => {
    try {
      const { destination, days, categories } = req.query;

      if (!destination || !days || !categories) {
        throw new Error('Required parameters not provided');
      }

      logger.info(
        `Creating trip: [Destination: ${destination}, days: ${days}, categories: ${categories}].`
      );

      const trip = await createTrip(destination, days, categories);

      if (!trip) {
        logger.error(`Error creating trip to ${destination}.`);
        throw new Error('Error creating trip');
      }

      return res.send(generateHTML(trip));
    } catch (error) {
      logger.error(`TripController.createNewTrip - ${error}.`);
      return res
        .status(400)
        .sendFile(path.join(__dirname, '../../public/not-found.html'));
    }
  };
}

const generateHTML = (trip) => {
  if (!trip) {
    throw new Error('Trip not informed');
  }

  let template = loadTemplateFile();

  if (!template) {
    throw new Error('Template file not found');
  }

  return template
    .replace(/_trip/, JSON.stringify(trip))
    .replace('#{destination}', trip.destination);
};

const loadTemplateFile = () => {
  const filePath = path.join(__dirname, '../templates/responseMap.html');

  try {
    if (!fs.existsSync(filePath)) {
      logger.error(`File not found: ${filePath}.`);
      return '';
    }

    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    logger.error(`Error reading file ${filePath} - ${error.message}.`);
    return '';
  }
};

module.exports = TripController;
