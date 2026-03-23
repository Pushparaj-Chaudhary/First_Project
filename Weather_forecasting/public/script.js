const inputBox = document.getElementById('city-input');
const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-button');
const locationBtn = document.getElementById('location-button');
const toggleUnitBtn = document.getElementById('toggle-unit');
const toggleThemeBtn = document.getElementById('toggle-theme');
const weatherImg = document.getElementById('weather-img');
const temperatureElem = document.getElementById('temp-value');
const descriptionElem = document.getElementById('description');
const humidityElem = document.getElementById('humidity');
const windSpeedElem = document.getElementById('wind-speed');
const feelsLikeElem = document.getElementById('feels-like');
const pressureElem = document.getElementById('pressure');
const coordsElem = document.getElementById('coords');
const sunriseElem = document.getElementById('sunrise');
const sunsetElem = document.getElementById('sunset');
const windDegElem = document.getElementById('wind-deg');
const locationNotFound = document.getElementById('location-not-found');
const weatherBody = document.getElementById('weather-body');
const forecastSection = document.getElementById('forecast-section');
const forecastCards = document.getElementById('forecast-cards');
const statusMessage = document.getElementById('status-message');
const loadingElem = document.getElementById('loading');

let currentUnit = 'C';
let lastWeatherData = null;
let isDarkMode = true;

function showElement(element) {
  element.classList.remove('hidden');
}

function hideElement(element) {
  element.classList.add('hidden');
}

function clearDisplay() {
  hideElement(weatherBody);
  hideElement(forecastSection);
  hideElement(locationNotFound);
}

function setStatus(message, isError = false) {
  if (!message) {
    hideElement(statusMessage);
    statusMessage.textContent = '';
    return;
  }
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? '#d3274f' : '#2e7d32';
  showElement(statusMessage);
}

function showError(message) {
  clearDisplay();
  showElement(locationNotFound);
  setStatus(message, true);
}

function getWindDirection(deg) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function formatTime(unix, tzOffset) {
  const date = new Date((unix + tzOffset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function applyTheme() {
  if (isDarkMode) {
    document.body.classList.remove('light-theme');
    toggleThemeBtn.textContent = 'Dark Mode';
  } else {
    document.body.classList.add('light-theme');
    toggleThemeBtn.textContent = 'Light Mode';
  }
  localStorage.setItem('weatherTheme', isDarkMode ? 'dark' : 'light');
}

function setSavedState() {
  const savedUnit = localStorage.getItem('weatherUnit');
  const savedCity = localStorage.getItem('weatherCity');
  const theme = localStorage.getItem('weatherTheme');

  if (savedUnit) {
    currentUnit = savedUnit;
    toggleUnitBtn.textContent = currentUnit === 'C' ? 'Show °F' : 'Show °C';
  }

  if (theme) {
    isDarkMode = theme !== 'light';
    applyTheme();
  }

  if (savedCity) {
    checkWeather(savedCity);
  } else {
    checkWeather('New York');
  }
}

function setQsImage(condition) {
  const imgName = {
    Clouds: 'cloud.png',
    Clear: 'clear.png',
    Rain: 'rain.png',
    Drizzle: 'rain.png',
    Mist: 'mist.png',
    Fog: 'mist.png',
    Snow: 'snow.png',
    Thunderstorm: 'rain.png'
  }[condition] || 'cloud.png';
  weatherImg.src = `image/${imgName}`;
}

function formatSpeed(speed) {
  return currentUnit === 'C' ? `${(speed * 3.6).toFixed(1)} km/h` : `${(speed * 2.23694).toFixed(1)} mph`;
}

function tempString(kelvin) {
  if (currentUnit === 'C') {
    return `${Math.round(kelvin - 273.15)}°C`;
  }
  return `${Math.round((kelvin - 273.15) * 9/5 + 32)}°F`;
}

function renderWeather(data) {
  if (!data) return;
  lastWeatherData = data;

  setQsImage(data.weather[0].main);
  temperatureElem.textContent = tempString(data.main.temp);
  descriptionElem.textContent = data.weather[0].description;
  humidityElem.textContent = `${data.main.humidity}%`;
  windSpeedElem.textContent = formatSpeed(data.wind.speed);
  feelsLikeElem.textContent = tempString(data.main.feels_like);
  pressureElem.textContent = `Pressure: ${data.main.pressure} hPa`;
  coordsElem.textContent = `Coordinates: [${data.coord.lat.toFixed(2)}, ${data.coord.lon.toFixed(2)}]`;
  windDegElem.textContent = `Wind Direction: ${getWindDirection(data.wind.deg)} (${Math.round(data.wind.deg)}°)`;
  sunriseElem.textContent = `Sunrise: ${formatTime(data.sys.sunrise, data.timezone)}`;
  sunsetElem.textContent = `Sunset: ${formatTime(data.sys.sunset, data.timezone)}`;

  localStorage.setItem('weatherCity', data.name);
  localStorage.setItem('weatherUnit', currentUnit);

  hideElement(locationNotFound);
  hideElement(statusMessage);
  showElement(weatherBody);

  fetchForecast(data.coord.lat, data.coord.lon);
}

function renderForecast(data) {
  if (!data || !Array.isArray(data.list)) {
    hideElement(forecastSection);
    return;
  }

  const daily = {};
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!daily[dayKey] && date.getHours() === 12) {
      daily[dayKey] = item;
    }
  });

  // Fallback if noon points are not available for all days
  if (Object.keys(daily).length < 3) {
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      if (!daily[dayKey]) {
        daily[dayKey] = item;
      }
    });
  }

  const entries = Object.entries(daily).slice(0, 3);
  forecastCards.innerHTML = '';

  if (!entries.length) {
    hideElement(forecastSection);
    return;
  }

  entries.forEach(([day, item]) => {
    const icon = item.weather[0]?.icon || '01d';
    const temp = tempString(item.main.temp);
    const card = document.createElement('article');
    card.className = 'forecast-card';
    card.innerHTML = `
      <p>${day}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${item.weather[0].description}">
      <p>${item.weather[0].main}</p>
      <p><strong>${temp}</strong></p>
    `;
    forecastCards.appendChild(card);
  });

  showElement(forecastSection);
}

async function fetchForecast(lat, lon) {
  try {
    const forecastUrl = `/api/forecast?lat=${lat}&lon=${lon}`;
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      hideElement(forecastSection);
      return;
    }
    const forecastData = await response.json();
    renderForecast(forecastData);
  } catch (err) {
    console.warn('Forecast fetch error', err);
    hideElement(forecastSection);
  }
}

async function fetchWeather(url) {
  try {
    hideElement(locationNotFound);
    showElement(loadingElem);
    hideElement(weatherBody);

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        showError('Location not found. Please check spelling and try again.');
      } else if (response.status === 401) {
        showError('Invalid API key. Update your OpenWeatherMap key.');
      } else {
        showError('Unable to fetch weather data right now. Please try again later.');
      }
      return;
    }

    const data = await response.json();
    renderWeather(data);
  } catch (err) {
    console.error(err);
    showError('Network error. Check your connection and try again.');
  } finally {
    hideElement(loadingElem);
  }
}

function checkWeather (city) {
  if (!city || city.trim() === '') {
    setStatus('Please enter a city name.', true);
    return;
  }
  const url = `/api/weather?q=${encodeURIComponent(city)}`;
  fetchWeather(url);
}

function checkWeatherByCoords(lat, lon) {
  const url = `/api/weather?lat=${lat}&lon=${lon}`;
  fetchWeather(url);
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  setStatus('');
  checkWeather(inputBox.value);
});

locationBtn.addEventListener('click', () => {
  setStatus('');

  if (!navigator.geolocation) {
    setStatus('Geolocation is not supported by your browser.', true);
    return;
  }

  showElement(loadingElem);
  navigator.geolocation.getCurrentPosition(
    position => {
      hideElement(loadingElem);
      checkWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    error => {
      hideElement(loadingElem);
      setStatus('Geolocation failed. Please allow location access or search manually.', true);
      console.warn('Geolocation error', error);
    }
  );
});

toggleUnitBtn.addEventListener('click', () => {
  currentUnit = currentUnit === 'C' ? 'F' : 'C';
  toggleUnitBtn.textContent = currentUnit === 'C' ? 'Show °F' : 'Show °C';
  localStorage.setItem('weatherUnit', currentUnit);

  if (lastWeatherData) {
    renderWeather(lastWeatherData);
  }
});

toggleThemeBtn.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  applyTheme();
});

// Load saved state and start
setSavedState();
