require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Simple cache
const cache = new Map();
const CACHE_DURATION = parseInt(process.env.CACHE_DURATION) || 300000; // 5 minutes

// Helper to get from cache
const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper to set cache
const setCache = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Routes
app.get('/api/weather/current', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter required' });
    }

    const cacheKey = `weather_${city}_${units}`;
    const cached = getFromCache(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    );

    setCache(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch weather data'
    });
  }
});

app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter required' });
    }

    const cacheKey = `forecast_${city}_${units}`;
    const cached = getFromCache(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    );

    setCache(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch forecast data'
    });
  }
});

app.get('/api/weather/air-quality', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const cacheKey = `airQuality_${lat}_${lon}`;
    const cached = getFromCache(cacheKey);
    if (cached) {
      return res.json({ ...cached, cached: true });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    setCache(cacheKey, response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch air quality data'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🌤️  Weather API proxy running on port ${PORT}`);
  console.log(`📝 API Key: ${API_KEY ? 'Set' : 'Not set'}`);
});
