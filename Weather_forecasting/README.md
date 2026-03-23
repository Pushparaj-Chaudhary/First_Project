# Weather Forecast App

A modern, responsive weather forecasting web application with a Node.js backend that provides current weather conditions and a 3-day forecast for any location worldwide.

## 🌟 Features

- **Real-time Weather Data**: Get current weather conditions including temperature, humidity, wind speed, and more
- **3-Day Forecast**: View weather predictions for the next three days
- **Location Search**: Search for weather by city name
- **Geolocation Support**: Use your current location with one click
- **Unit Conversion**: Toggle between Celsius (°C) and Fahrenheit (°F)
- **Dark/Light Theme**: Switch between dark and light themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Persistent Settings**: Your preferences (theme, units, last searched city) are saved locally

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **API**: OpenWeatherMap API (proxied through backend)
- **Font Awesome**: Icons and visual elements
- **Local Storage**: Client-side data persistence

## 🚀 Setup and Deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-forecasting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your OpenWeatherMap API key:
     ```
     OPENWEATHER_API_KEY=your_actual_api_key_here
     ```

4. **Get OpenWeatherMap API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

5. **Run the application**
   ```bash
   npm start
   ```
   - Open `http://localhost:3000` in your browser

### Deployment to Render

1. **Push your code to GitHub**

2. **Create a new Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   - In Render dashboard, go to your service settings
   - Add environment variable:
     - Key: `OPENWEATHER_API_KEY`
     - Value: Your actual OpenWeatherMap API key

4. **Deploy**
   - Render will automatically build and deploy your app
   - Your app will be live at the provided URL

### Security Note

✅ **API Key Protection**: The API key is now securely stored in the backend and not exposed to the frontend, preventing unauthorized access and protecting your API quota.

## 📱 Usage

1. **Search by City**: Enter a city name in the search box and click the search icon
2. **Use Current Location**: Click the location button to get weather for your current position
3. **Toggle Units**: Click "Show °F" or "Show °C" to switch temperature units
4. **Change Theme**: Click "Dark Mode" or "Light Mode" to toggle themes
5. **View Forecast**: Scroll down to see the 3-day weather forecast

## 🏗️ Project Structure

```
weather-forecasting/
├── wthr.html          # Main HTML file
├── style.css          # CSS styles
├── script.js          # JavaScript functionality
├── image/             # Weather condition images
│   ├── 404.png       # Error image
│   ├── clear.png     # Clear weather
│   ├── cloud.png     # Cloudy weather
│   ├── mist.png      # Misty weather
│   ├── rain.png      # Rainy weather
│   └── snow.png      # Snowy weather
└── README.md         # This file
```

## 🔧 Local Development

1. Clone the repository
2. Open `wthr.html` in your browser
3. The app will work locally, but you'll need a valid API key for weather data

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 API Usage

This app uses the OpenWeatherMap API endpoints:
- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Inspired by modern weather applications

---

**Note**: This is a frontend-only application. For production use, consider implementing proper API key security measures.</content>
<parameter name="filePath">c:\Users\HP\Desktop\New folder\Portfolio - Copy\Weather_forecasting\README.md