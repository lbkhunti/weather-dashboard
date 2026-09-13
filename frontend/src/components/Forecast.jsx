import React from 'react';
import { getWeatherIconUrl } from '../services/weatherService';
import { motion } from 'framer-motion';

const Forecast = ({ data, units = 'metric' }) => {
  if (!data || !data.list) {
    return <div className="text-white/50">No forecast data available</div>;
  }

  // Get daily forecasts (every 8th item = 24 hours)
  const dailyForecasts = [];
  for (let i = 0; i < data.list.length; i += 8) {
    if (dailyForecasts.length < 5) {
      dailyForecasts.push(data.list[i]);
    }
  }

  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/30 transition text-center"
          >
            <p className="text-white/70 text-sm mb-2">
              {new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>

            <img
              src={getWeatherIconUrl(forecast.weather[0].icon)}
              alt={forecast.weather[0].main}
              className="w-12 h-12 mx-auto mb-2"
            />

            <p className="text-white/60 text-xs mb-2 capitalize">
              {forecast.weather[0].description}
            </p>

            <div className="flex justify-center gap-2 items-center">
              <span className="text-xl font-bold text-white">
                {Math.round(forecast.main.temp_max)}{tempUnit}
              </span>
              <span className="text-white/60">
                {Math.round(forecast.main.temp_min)}{tempUnit}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-white/60 text-xs">
                💧 {forecast.main.humidity}%
              </p>
              <p className="text-white/60 text-xs">
                💨 {forecast.wind.speed.toFixed(1)} m/s
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
