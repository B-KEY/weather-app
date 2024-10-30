import React from 'react';
import { getTranslation } from '../utils/translations';

const WeatherCard = ({ weatherData, unit, language }) => {
  return (
    <div className="weather-card glass-effect rounded-2xl p-8 text-white shadow-custom hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-5xl font-bold neon-text">{weatherData.name}</h2>
          <p className="text-7xl font-light">
            {Math.round(weatherData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p className="text-2xl capitalize opacity-90">{weatherData.weather[0].description}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={weatherData.weather[0].description}
            className="w-40 h-40 filter drop-shadow-lg"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-6">
        <div className="text-center">
          <p className="text-sm opacity-70">{getTranslation(language, 'min')}</p>
          <p className="text-xl">{Math.round(weatherData.main.temp_min)}°{unit === 'metric' ? 'C' : 'F'}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-70">{getTranslation(language, 'max')}</p>
          <p className="text-xl">{Math.round(weatherData.main.temp_max)}°{unit === 'metric' ? 'C' : 'F'}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 