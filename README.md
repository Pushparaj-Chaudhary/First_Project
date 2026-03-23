🌤 Weather Forecasting App

A full-stack weather forecast app using Node.js and OpenWeatherMap (via a secure backend proxy).

🔹 Project Overview
Backend: Node.js + Express
Frontend: HTML, CSS, JavaScript (static files served from public/)
API: OpenWeatherMap (accessed via server endpoints)

Endpoints:

/api/weather?q= → Current weather for a city
/api/forecast?q= → 3-day forecast
🌟 Key Features
Current Weather: Temperature, humidity, wind, pressure, sunrise/sunset, weather description
3-Day Forecast Cards: Extracted from OpenWeatherMap 5-day forecast
City Search: Search weather by city name
Geolocation Support: One-click GPS location query
Unit Toggle: Celsius / Fahrenheit
Light/Dark Theme Toggle
Persistent Settings: Theme, unit, and last searched city saved in localStorage
Responsive UI: Works on desktop and mobile
Error Handling: Invalid city, API errors, network issues
🗂 Project Structure
Weather_forecasting/
├─ .env                     # Local environment file (not committed)
├─ package.json
├─ package-lock.json
├─ server.js                # Express backend + OpenWeatherMap proxy
├─ public/
│  ├─ index.html
│  ├─ style.css
│  ├─ script.js
│  └─ image/                # Weather icons and status images
└─ README.md
⚙️ Setup Instructions
Clone the repository
git clone <your-repo-url>
cd Weather_forecasting
Install dependencies
npm install
Create .env file

Add your OpenWeatherMap API key:

OPENWEATHER_API_KEY=your_openweather_api_key
Run the app
npm start
Open in browser
http://localhost:3000
📝 Usage
Type a city name and click search.
Click the location button for GPS-based weather.
Toggle between °C and °F.
Toggle Light/Dark theme.
View the 3-day forecast section.
⚠️ Troubleshooting
Location not found: Check for invalid city name.
Invalid API key: Verify .env key value.
CORS issues: Avoided because backend proxies requests.
🤝 Contributing
Fork the repository
Create a new branch
Make changes
Submit a Pull Request (PR)
