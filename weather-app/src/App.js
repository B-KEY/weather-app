import React, { useState, useEffect, useCallback } from 'react';
import { getWeatherData, getForecastData } from './services/weatherService';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import GeoLocation from './components/GeoLocation';
import DetailedWeather from './components/DetailedWeather';
import LanguageSelector from './components/LanguageSelector';
import UnitToggle from './components/UnitToggle';
import ParticlesBackground from './components/ParticlesBackground';
import LocationSearch from './components/LocationSearch';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [language, setLanguage] = useState('en');
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  const fetchWeatherData = useCallback(async (cityName) => {
    if (!cityName) return;
    
    setLoading(true);
    setError('');
    
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        getWeatherData(cityName, unit, language),
        getForecastData(cityName, unit, language)
      ]);
      
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
      setLastSearchedCity(cityName);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit, language]);

  const handleLocationSelect = async (lat, lon) => {
    setLoading(true);
    setError('');
    
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        getWeatherData({ lat, lon }, unit, language),
        getForecastData({ lat, lon }, unit, language)
      ]);
      
      setCity(weatherResponse.name);
      setLastSearchedCity(weatherResponse.name);
      setWeatherData(weatherResponse);
      setForecastData(forecastResponse);
    } catch (err) {
      setError('Error getting weather for your location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastSearchedCity) {
      fetchWeatherData(lastSearchedCity);
    }
  }, [unit, language, lastSearchedCity]);

  const getBackgroundClass = () => {
    if (!weatherData?.weather[0]?.main) {
      // Aurora theme default gradient
      return 'bg-gradient-to-br from-[#000428] to-[#004e92]';
    }
    
    switch(weatherData.weather[0].main.toLowerCase()) {
      case 'clear':
        return 'bg-gradient-to-br from-blue-400 to-blue-800';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 to-gray-800';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-to-br from-gray-700 to-gray-900';
      case 'snow':
        return 'bg-gradient-to-br from-blue-100 to-blue-300';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-gray-900 to-purple-900';
      default:
        return 'bg-gradient-to-br from-[#000428] to-[#004e92]';
    }
  };

  return (
    <div className={`App min-h-screen relative transition-colors duration-500 ${getBackgroundClass()}`}>
      <ParticlesBackground weatherCondition={weatherData?.weather[0]?.main} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="glass-effect rounded-3xl p-8 shadow-custom fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold text-white">Weather Forecast</h1>
            <div className="flex gap-4">
              <LanguageSelector language={language} setLanguage={setLanguage} />
              <UnitToggle unit={unit} setUnit={setUnit} />
            </div>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <LocationSearch 
                onLocationSelect={handleLocationSelect}
                loading={loading}
                language={language}
              />
              <GeoLocation 
                onLocationSelect={handleLocationSelect} 
                loading={loading}
                language={language}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-300 text-center mb-6 p-4 glass-effect rounded-xl slide-up">
              {error}
            </div>
          )}
          
          <div className="space-y-8">
            {weatherData && (
              <>
                <WeatherCard 
                  weatherData={weatherData} 
                  unit={unit} 
                  language={language} 
                />
                <DetailedWeather 
                  weatherData={weatherData} 
                  unit={unit} 
                  language={language} 
                />
              </>
            )}
            {forecastData && (
              <div className="slide-up">
                <ForecastCard 
                  forecast={forecastData} 
                  unit={unit} 
                  language={language} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
