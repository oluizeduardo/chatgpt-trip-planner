<div align="center">
  <img src="./src/public/includes/imgs/tab-icon.png" width="100" height="100">  
</div>

# Trip Planner 🌍✈️

Trip Planner is a smart travel suggestion application that uses ChatGPT and the Google Maps API to recommend places to visit based on user preferences. Users input their destination, the number of days they plan to stay, and their preferred entertainment category. The AI then suggests points of interest and displays them interactively on a map.

## 🛠️ Tech Stack

- Frontend
  - [Bootstrap](https://getbootstrap.com/)
  - [Google Maps JS Library](https://developers.google.com/maps/documentation/javascript/overview) - Used for mapping and routing
- Backend
  - NodeJS
  - [Express](https://expressjs.com/)
  - [OpenAI ChatGPT API](https://platform.openai.com/docs/overview)
- CICD
  - [GitHub Actions](https://docs.github.com/en/actions)
- Deploy
  - [Render](https://render.com/)

## 🚀 How to run locally

- Clone this project.
  - `git clone https://github.com/oluizeduardo/chatgpt-trip-planner.git`
- Access the root folder.
  - `cd chatgpt-trip-planner`
- Configure the environment variables.
  - `cp .env-example .env`
- Install all the dependencies.
  - `npm install`
- Run the server.
  - `npm start`

## 🔗 Code analysis

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-dark.svg)](https://sonarcloud.io/summary/new_code?id=oluizeduardo_chatgpt-trip-planner)

## 🔥 Future Enhancements
- Implement full trip itinerary planning, including scheduling and routes.
- Allow users to manually adjust AI suggestions.
- Enable saving and sharing of trip plans.

## 🤝 Contributing 
Contributions are welcome! Feel free to open issues, suggest features, or submit pull requests.
