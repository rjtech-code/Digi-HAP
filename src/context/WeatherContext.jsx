import { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherByCoords } from '../services/weatherService';

const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Fetch weather for Churu district center
        const result = await fetchWeatherByCoords(28.3000, 74.9600);
        
        if (result.success) {
          setWeatherData(result.data);
          setError(null);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const value = {
    weatherData,
    loading,
    error,
    getWeatherForWard: (wardId) => {
      // Return the same weather data for all wards
      // In a real app, you might want to fetch per ward
      return weatherData;
    },
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};