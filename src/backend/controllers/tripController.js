const { createTrip } = require('../service/chatgptService');
const logger = require('../logger/logger');
const path = require('path');

class TripController {
  static createNewTrip = async (req, res) => {
    try {
      const { destination, days, categories } = req.query;

      if (!destination || !days || !categories) {
        return res
          .status(400)
          .sendFile(path.join(__dirname, '../../public/not-found.html'));
      }

      logger.info(
        `Creating trip: [Destination: ${destination}, days: ${days}, categories: ${categories}].`
      );

      const trip = await createTrip(destination, days, categories);

      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Trip to ${trip.destination} | Trip Planner</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Plan your trip smartly with Trip Planner. Use ChatGPT AI to create personalized itineraries, discover destinations, and optimize your travel time.">              
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">            
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4BmMqqMAsw_dnX5bMgcZ2epfpOJtwH0Q&libraries=places,marker"></script>
        </head>
        <body>
            <div id="map" style="width: 100vw; height: 100vh; background-color: blanchedalmond;"></div>
            <script>
                async function initMap() {
                  const position = { lat: ${trip.geolocation.lat}, lng: ${trip.geolocation.lng} };
                  const options = {
                      zoom: 13,
                      center: position,
                      mapId: "DEMO_MAP_ID",
                  };            

                  const map = new google.maps.Map(document.getElementById('map'), options);

                  google.maps.event.addListener(map, 'click', 
                  function(event){
                    addMarker({coord: event.latLng});
                  });

                  addMarker({
                    coord:{ lat: ${trip.geolocation.lat}, lng: ${trip.geolocation.lng} }, 
                    content:'<h6>${trip.destination}</h6>'
                  });           

                  function addMarker(props){
                    const marker = new google.maps.marker.AdvancedMarkerElement({
                      map: map,
                      position: props.coord,
                      title: props.content || "", 
                    });

                    if(props.content){
                      const infoWindow = new google.maps.InfoWindow({
                        content: props.content
                      });

                      marker.addListener('mouseover', () => {
                        infoWindow.open({
                            anchor: marker,
                            map,
                        });
                      });
                    }
                  } 
                }
                initMap();
            </script>
        </body>
        </html>  
      `);
    } catch (error) {
      logger.error(`TripController.createNewTrip - ${error}.`);
      return res
        .status(400)
        .sendFile(path.join(__dirname, '../../public/not-found.html'));
    }
  };
}

module.exports = TripController;
