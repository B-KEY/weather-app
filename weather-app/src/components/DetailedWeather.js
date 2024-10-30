import React from 'react';
import { WiBarometer, WiHumidity, WiStrongWind, WiThermometer } from 'react-icons/wi';
import { getTranslation } from '../utils/translations';

const DetailedWeather = ({ weatherData, unit, language }) => {
  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {/* Feels Like Temperature */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <WiThermometer className="text-3xl mx-auto mb-2" />
        <p className="text-sm opacity-70">{getTranslation(language, 'feelsLike')}</p>
        <p className="text-xl">{Math.round(weatherData.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</p>
      </div>

      {/* Humidity */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <WiHumidity className="text-3xl mx-auto mb-2" />
        <p className="text-sm opacity-70">{getTranslation(language, 'humidity')}</p>
        <p className="text-xl">{weatherData.main.humidity}%</p>
      </div>

      {/* Wind */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <WiStrongWind className="text-3xl mx-auto mb-2" />
        <p className="text-sm opacity-70">{getTranslation(language, 'windSpeed')}</p>
        <p className="text-xl">
          {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
        </p>
        <p className="text-sm">{getWindDirection(weatherData.wind.deg)}</p>
      </div>

      {/* Pressure */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <WiBarometer className="text-3xl mx-auto mb-2" />
        <p className="text-sm opacity-70">{getTranslation(language, 'pressure')}</p>
        <p className="text-xl">{weatherData.main.pressure} hPa</p>
      </div>

      {/* Visibility */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <p className="text-sm opacity-70">{getTranslation(language, 'visibility')}</p>
        <p className="text-xl">{(weatherData.visibility / 1000).toFixed(1)} km</p>
      </div>

      {/* Sunrise */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <p className="text-sm opacity-70">{getTranslation(language, 'sunrise')}</p>
        <p className="text-xl">
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(language)}
        </p>
      </div>

      {/* Sunset */}
      <div className="glass-effect p-4 rounded-xl text-center hover:bg-white/10 transition-all">
        <p className="text-sm opacity-70">{getTranslation(language, 'sunset')}</p>
        <p className="text-xl">
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(language)}
        </p>
      </div>
    </div>
  );
};

export default DetailedWeather; 