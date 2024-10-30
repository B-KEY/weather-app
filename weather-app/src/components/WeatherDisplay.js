import { getTranslation } from '../utils/translations';

const WeatherDisplay = ({ weatherData, language }) => {
  return (
    <div className="weather-display">
      {/* Main weather info */}
      <div>
        <p>{getTranslation(language, 'feelsLike')}: {weatherData.feels_like}°</p>
        <p>{getTranslation(language, 'humidity')}: {weatherData.humidity}%</p>
        <p>{getTranslation(language, 'windSpeed')}: {weatherData.wind_speed} m/s</p>
        <p>{getTranslation(language, 'pressure')}: {weatherData.pressure} hPa</p>
        <p>{getTranslation(language, 'visibility')}: {weatherData.visibility} m</p>
      </div>
      
      {/* Sunrise/Sunset */}
      <div>
        <p>{getTranslation(language, 'sunrise')}: {formatTime(weatherData.sunrise)}</p>
        <p>{getTranslation(language, 'sunset')}: {formatTime(weatherData.sunset)}</p>
      </div>
    </div>
  );
}; 