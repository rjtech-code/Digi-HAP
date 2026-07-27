import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchWeatherByCoords } from '../services/weatherService';
import { calculateWardTemperature } from '../utils/temperatureUtils';
import { wards } from '../data/wards';

const WeatherContext = createContext(null);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wardTemperatures, setWardTemperatures] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Fetch weather for Churu district center
        const result = await fetchWeatherByCoords(28.3000, 74.9600);
        
        if (result.success) {
          setWeatherData(result.data);
          setError(null);
          
          // Calculate ward temperatures based on base temperature and risk scores
          if (result.data && result.data.current && result.data.current.temp) {
            const baseTemp = result.data.current.temp;
            const calculatedTemps = {};
            
            wards.forEach(ward => {
              calculatedTemps[ward.wardId] = calculateWardTemperature(
                baseTemp,
                ward.riskScore,
                ward.wardId
              );
            });
            
            setWardTemperatures(calculatedTemps);
          }
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
    wardTemperatures,
    getWeatherForWard: (wardId) => {
      // Return the same weather data for all wards
      return weatherData;
    },
    getWardTemperature: (wardId) => {
      return wardTemperatures[wardId] || null;
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
