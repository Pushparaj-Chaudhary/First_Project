# Weather Forecasting

A full-stack weather forecast app using Node.js and OpenWeatherMap (via secure backend proxy).

## ?? Project Overview

- **Backend**: Node.js + Express
- **Frontend**: HTML/CSS/JavaScript (static files served from public)
- **API**: OpenWeatherMap through server endpoints (/api/weather, /api/forecast)

## ?? Key Features

- Current weather (temp, humidity, wind, pressure, sunrise/sunset, description)
- 3-day forecast cards (from OpenWeatherMap 5-day forecast)
- City search (/api/weather?q=<city>)
- Geolocation support (one-click browser location query)
- Unit toggle (Degree C / Degreee F)
- Light/Dark theme toggle
- Persistent settings via localStorage (	heme, unit, last city)
- Responsive UI for desktop/mobile
- Error handling: invalid city, API issues, network problems

## ??? Project Structure

`
Weather_forecasting/
+-- .env                       # local env file (not committed)
+-- package.json
+-- package-lock.json
+-- server.js                  # Express backend + OpenWeatherMap proxy
+-- public/
�   +-- index.html
�   +-- style.css
�   +-- script.js
�   +-- image/                 # weather icons and status images
+-- README.md
`

## ??? Setup

1. Clone repo
   `ash
git clone <your-repo-url>
cd Weather_forecasting
`
2. Install dependencies
   `ash
npm install
`
3. Create .env with key
   `ini
OPENWEATHER_API_KEY=your_openweather_api_key
`
4. Run app
   `ash
npm start
`
5. Open browser
   - http://localhost:3000

## ?? Usage

1. Type a city name and click search.
2. Or click location button for GPS-based weather.
3. Toggle unit between �C and �F.
4. Toggle theme between dark/light.
5. View 3-day forecast section.

## ?? Troubleshooting

- Location not found ? invalid city name.
- Invalid API key ? check .env key value.
- Gamma or CORS issues are avoided because backend proxies requests.

## ?? Contributing

1. Fork
2. Create branch
3. PR