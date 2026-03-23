🌤 Weather Forecasting App
A full-stack weather forecast app using Node.js and OpenWeatherMap, with a secure backend proxy.

Project Overview
Backend: Node.js + Express
Frontend: HTML, CSS, JavaScript (static files served from public/)
API: OpenWeatherMap through server endpoints:
/api/weather?q= → Current weather for a city
/api/forecast?q= → 3-day forecast

🌟 Key Features
Current Weather: Temperature, humidity, wind, pressure, sunrise/sunset, description
3-Day Forecast Cards (from OpenWeatherMap 5-day forecast)
City Search (/api/weather?q=)
Geolocation Support (one-click GPS location query)
Unit Toggle: Celsius / Fahrenheit
Light/Dark Theme Toggle
Persistent Settings: Saves theme, unit, last searched city in localStorage
Responsive UI for desktop and mobile
Error Handling: Invalid city, API issues, network problems

🗂 Project Structure
Weather_forecasting/
├─ .env                  # Local environment file (not committed)
├─ package.json
├─ package-lock.json
├─ server.js             # Express backend + OpenWeatherMap proxy
├─ public/
│  ├─ index.html
│  ├─ style.css
│  ├─ script.js
│  └─ image/             # Weather icons and status images
└─ README.md

📝 Usage
Type a city name and click search.
Click the location button for GPS-based weather.
Toggle between °C and °F.
Toggle Light/Dark theme.
View the 3-day forecast section.

⚠️ Troubleshooting
Location not found: Invalid city name.
Invalid API key: Check .env key value.
CORS issues: Avoided because backend proxies requests.

🤝 Contributing
Fork the repository
Create a new branch
Make your changes
Submit a Pull Request (PR)
