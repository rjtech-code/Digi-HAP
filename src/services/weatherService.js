import axios from 'axios';

const API_KEY = '8b00c6179c79b9e88b87660fd1ddb870';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });

    // Normalize the response to match expected structure
    const normalizedData = {
      current: {
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        wind_speed: response.data.wind.speed,
        weather: response.data.weather,
      },
    };

    return {
      success: true,
      data: normalizedData,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const fetchWeatherForWard = async (ward) => {
  if (!ward.latitude || !ward.longitude) {
    return {
      success: false,
      error: 'Ward coordinates not available',
    };
  }

  return await fetchWeatherByCoords(ward.latitude, ward.longitude);
};
