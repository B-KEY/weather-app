import axios from 'axios';

const API_KEY = 'a0dafb3a5a0172b5281ccc344364083e';
const GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0';

export const searchLocations = async (searchText, language = 'en') => {
  try {
    const response = await axios.get(
      `${GEO_BASE_URL}/direct?q=${searchText}&limit=5&appid=${API_KEY}`
    );
    
    // Validate and format the response data
    return response.data.map(location => ({
      name: location.name,
      state: location.state || '',
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      // Now language is defined as a parameter
      localName: location.local_names?.[language] || location.name
    }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
}; 