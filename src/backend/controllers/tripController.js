const { createTrip } = require('../chatgptService');
const logger = require('../logger/logger');
const fs = require('fs');
const path = require('path');

class TripController {
  static createNewTrip = async (req, res) => {
    try {
      const { destino, dias, categorias } = req.query;

      if (!destino || !dias || !categorias) {
        return res.status(400).json({
          message: 'Parâmetros destino, dias e categorias são obrigatórios.',
        });
      }

      logger.info(
        `Creating trip: [Destination: ${destino}, days: ${dias}, category: ${categorias}].`
      );

      const trip = await createTrip(destino, categorias, dias);

      res.send(generateHTML(destino, dias, categorias, trip));
    } catch (error) {
      logger.error(`TripController.createNewTrip - ${error}.`);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
}

// Utility function to prevent XSS when displaying data on the page
const escapeHTML = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const generateHTML = (destination, days, categories, trip) => {
  let template = loadTemplateFile('../templates/responseText.html');

  if (!template) {
    throw new Error('Template file not found');
  }

  const safeDestination = escapeHTML(destination);
  const safeDays = escapeHTML(days);
  const safeCategories = escapeHTML(categories);

  template = template
    .replace(/#\{destination\}/g, safeDestination)
    .replace(/#\{days\}/g, safeDays)
    .replace(/#\{categories\}/g, safeCategories)
    .replace(/#\{trip\}/g, trip);

  return template;
};

const loadTemplateFile = (filePath) => {
  if (!filePath) {
    logger.error('No file path provided.');
    return '';
  }

  try {
    const fullFilePath = path.join(__dirname, filePath);

    if (!fs.existsSync(fullFilePath)) {
      logger.error(`File not found: ${fullFilePath}.`);
      return '';
    }

    return fs.readFileSync(fullFilePath, 'utf8');
  } catch (error) {
    logger.error(`Error reading file ${filePath} - ${error.message}.`);
    return '';
  }
};

module.exports = TripController;
