import { getTranslation } from '../utils/translations';

const Forecast = ({ forecastData, language }) => {
  return (
    <div>
      <h2>{getTranslation(language, 'forecast')}</h2>
      {forecastData.map(day => (
        <div key={day.dt}>
          <p>{getTranslation(language, 'min')}: {day.temp.min}°</p>
          <p>{getTranslation(language, 'max')}: {day.temp.max}°</p>
          <p>{getTranslation(language, 'temperature')}: {day.temp.day}°</p>
        </div>
      ))}
    </div>
  );
}; 