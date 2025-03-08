const { createTrip } = require('../chatgptService');
const logger = require('../logger/logger');

class ItineraryController {
  static createNewTrip = async (req, res) => {
    try {
      const { destino, dias, categorias } = req.query;

      if (!destino || !dias || !categorias) {
        return res.status(400).json({
          message: 'Parâmetros destino, dias e categorias são obrigatórios.',
        });
      }

      logger.info(
        `Creating trip: [Destination: ${destino}, days: ${dias}, categories: ${categorias}].`
      );

      const trip = await createTrip(destino, categorias, dias);

      res.send(generateHTML(destino, dias, categorias, trip));
    } catch (error) {
      logger.error(
        `Error ItineraryController.createNewTrip - Details: ${error.message}`
      );
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

const generateHTML = (destino, dias, categorias, trip) => {
  const safeDestino = escapeHTML(destino);
  const safeDias = escapeHTML(dias);
  const safeCategorias = escapeHTML(categorias);
  const safeTrip = JSON.stringify(trip).replace(/</g, '\\u003c'); // Protection against XSS.

  return `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Viagem para ${safeDestino}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #dee9ff;
            height: 100vh;
            margin: 0;
          }
          .bg-blue-light {
            background-color: #5891ff;
          }
        </style>
    </head>
    <body>
        <div class="container mt-4">
            <div class="card">
                <div class="card-header bg-blue-light text-white">
                    Sua Viagem Personalizada ✈️
                </div>
                <div class="card-body">
                    <p class="card-text"><strong>Destino:</strong> ${safeDestino}</p>
                    <p class="card-text"><strong>Número de dias:</strong> ${safeDias}</p>
                    <p class="card-text"><strong>Categorias:</strong> ${safeCategorias}</p>
                    <hr>
                    <div id="outputText"></div>
                </div>
            </div>
            <a href="/">
              <button type="button" class="btn btn-primary mb-3 mt-3 rounded-pill">Voltar</button>
            </a> 
        </div>
        <script>
            document.getElementById("outputText").innerHTML = marked.parse(${safeTrip});
        </script>
    </body>
    </html>
  `;
};

module.exports = ItineraryController;
