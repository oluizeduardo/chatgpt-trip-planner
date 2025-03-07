const { createTrip } = require('../chatgptService');

let trip = '';

class IteneraryController {
  static createNewTrip = async (req, res) => {
    try {
      const { cidade, dias, categorias } = req.query;

      trip = await createTrip(cidade, categorias, dias);

      res.send(`
        <html>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Viagem para ${cidade}</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #dee9ff;
              height: 100vh;
              margin: 0;
            }
          </style>
          <body>        
            <div class="container">
              <h3 class="mt-3">Aqui está seu roteiro de ${dias} dias em ${cidade}. Aproveite!</h3>
              <br><br>
              <div id="outputText"></div>

              <p class="mt-3 mb-3">
                <a href="/">Voltar</a>
              </p>
            </div>
  
            <script>
                const tripStringfied = ${JSON.stringify(trip)};
                document.getElementById("outputText").innerHTML = marked.parse(tripStringfied);
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Error TripController.createNewTrip', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
}

module.exports = IteneraryController;
