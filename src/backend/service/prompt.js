const createPrompt = (destination, days, categories) => `
  Act as a travel planner and generate a ${days}-day itinerary for ${destination} 
  based on the following interests: ${categories}.
  The response must be a valid JSON object, **without markdown formatting, code blocks, or additional explanations**.
  Each day of the itinerary should include:
    - A numerical identifier for the day.
    - A list of tourist attractions, where each attraction includes:
      - Name of the place.
      - A brief description.
      - Estimated entrance fee (if applicable; otherwise, specify "Free").
      - Opening hours.
      - Estimated visit duration.
      - Geolocation (latitude, longitude).
  Respond with JSON only, formatted as follows:

  {
    "destination": "City Name",
    "geolocation": {
      "lat": latitude,
      "lng": longitude,
    },
    "days": [
      {
        "day": 1,
        "tourist_attractions": [
          {
            "name": "Tourist attraction name",
            "description": "Brief description of the place",
            "entrance_fee": "Price in local currency or 'Free'",
            "opening_hours": "Opening hours",
            "visit_duration": "Estimated visit duration",
            "geolocation": {
              "lat": latitude,
              "lng": longitude,
            }
          }
        ]
      }
    ]
  }
`;

module.exports = createPrompt;
