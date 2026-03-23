const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

// API Key from environment variable
const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error('OPENWEATHER_API_KEY environment variable is required');
  process.exit(1);
}

// Weather endpoint
app.get('/api/weather', async (req, res) => {
  try {
    const { q, lat, lon } = req.query;
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

    if (q) {
      url += `&q=${encodeURIComponent(q)}`;
    } else if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else {
      return res.status(400).json({ error: 'Either city name (q) or coordinates (lat, lon) are required' });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Weather API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Forecast endpoint
app.get('/api/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Forecast API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Forecast API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});