import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (query, unit = 'metric', lang = 'en') => {
  try {
    let url;
    if (typeof query === 'string') {
      url = `${BASE_URL}/weather?q=${query}&units=${unit}&lang=${lang}&appid=${API_KEY}`;
    } else {
      const { lat, lon } = query;
      url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&appid=${API_KEY}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForecastData = async (query, unit = 'metric', lang = 'en') => {
  try {
    let url;
    if (typeof query === 'string') {
      url = `${BASE_URL}/forecast?q=${query}&units=${unit}&lang=${lang}&appid=${API_KEY}`;
    } else {
      const { lat, lon } = query;
      url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&appid=${API_KEY}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 