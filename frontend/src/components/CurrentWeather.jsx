import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { getWeatherIconUrl } from '../services/weatherService';
import { motion } from 'framer-motion';

const CurrentWeather = ({ data, units = 'metric' }) => {
  if (!data) {
    return (
      <div className="text-center text-white/50">
        <p>No weather data available</p>
      </div>
    );
  }

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-2xl p-8 border border-white/10"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-white/70 capitalize">{data.weather[0].description}</p>
        </div>
        <img
          src={getWeatherIconUrl(data.weather[0].icon, '4x')}
          alt={data.weather[0].main}
          className="w-24 h-24"
        />
      </div>

      {/* Temperature */}
      <div className="mb-8">
        <div className="text-7xl font-bold text-white mb-2">
          {temp}{tempUnit}
        </div>
        <p className="text-xl text-white/80">
          Feels like {feelsLike}{tempUnit}
        </p>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Droplets className="w-5 h-5" />}
          label="Humidity"
          value={`${data.main.humidity}%`}
        />
        <MetricCard
          icon={<Wind className="w-5 h-5" />}
          label="Wind Speed"
          value={`${data.wind.speed} ${windUnit}`}
        />
        <MetricCard
          icon={<Eye className="w-5 h-5" />}
          label="Visibility"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
        />
        <MetricCard
          icon={<Gauge className="w-5 h-5" />}
          label="Pressure"
          value={`${data.main.pressure} mb`}
        />
      </div>

      {/* Last updated */}
      <p className="text-white/50 text-sm mt-6">
        Last updated: {new Date(data.dt * 1000).toLocaleTimeString()}
      </p>
    </motion.div>
  );
};

const MetricCard = ({ icon, label, value }) => (
  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition">
    <div className="flex items-center gap-2 text-white/70 mb-2">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <p className="text-2xl font-semibold text-white">{value}</p>
  </div>
);

export default CurrentWeather;
