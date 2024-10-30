import React from 'react';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { getTranslation } from '../utils/translations';

const ForecastCard = ({ forecast, unit, language }) => {
  if (!forecast || !forecast.list) {
    return null;
  }

  const groupedForecast = forecast.list.reduce((days, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
    return days;
  }, {});

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {getTranslation(language, 'forecast')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(groupedForecast).slice(0, 5).map(([date, items]) => {
          const dayData = items[0];
          return (
            <div key={date} className="weather-card glass-effect rounded-xl p-4 text-white">
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {new Date(date).toLocaleDateString(language, { weekday: 'short' })}
                </h3>
                <img 
                  src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`}
                  alt={dayData.weather[0].description}
                  className="w-20 h-20 mx-auto"
                />
                <p className="text-3xl font-light">
                  {Math.round(dayData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                </p>
                <p className="text-sm mt-2 capitalize">{dayData.weather[0].description}</p>
                
                <div className="mt-4 space-y-2 text-sm opacity-90">
                  <div className="flex items-center justify-center gap-1">
                    <WiThermometer className="text-xl" />
                    <span>{getTranslation(language, 'feelsLike')}: {Math.round(dayData.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <WiHumidity className="text-xl" />
                    <span>{getTranslation(language, 'humidity')}: {dayData.main.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <WiStrongWind className="text-xl" />
                    <span>{getTranslation(language, 'windSpeed')}: {dayData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard; 