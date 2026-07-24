import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, Thermometer, Cloud, Wind } from 'lucide-react';
import { fetchWeatherForWard } from '../services/weatherService';
import { getWardCoordinates } from '../data/wardCoordinates';

const WardCard = ({ ward }) => {
  const [liveWeather, setLiveWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Extreme':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Very Hot':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Hot':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Warm':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Safe':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusFromTemp = (temp) => {
    if (temp >= 48) return 'Extreme';
    if (temp >= 45) return 'Very Hot';
    if (temp >= 42) return 'Hot';
    if (temp >= 38) return 'Warm';
    return 'Safe';
  };

  const getAlertIcon = (alertLevel) => {
    switch (alertLevel) {
      case 'Red':
        return '🔴';
      case 'Orange':
        return '🟠';
      case 'Yellow':
        return '🟡';
      case 'Blue':
        return '🔵';
      case 'Green':
        return '🟢';
      default:
        return null;
    }
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      const coords = getWardCoordinates(ward.wardId);
      const result = await fetchWeatherForWard({ ...ward, ...coords });
      
      if (result.success) {
        setLiveWeather(result.data);
      }
      setLoading(false);
    };

    loadWeatherData();
  }, [ward.wardId]);

  // Get current temperature (live or fallback to static)
  const currentTemp = liveWeather ? Math.round(liveWeather.current.temp) : parseFloat(ward.temperature);
  const currentStatus = liveWeather ? getStatusFromTemp(currentTemp) : ward.status;

  return (
    <Link
      to={`/ward/${ward.wardId}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-primary-300 p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          <h3 className="text-lg font-semibold text-gray-900">
            {ward.wardName}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[15px] font-bold border ${getStatusColor(
            currentStatus
          )}`}
        >
          {loading ? '...' : `${currentTemp}°C`}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">
              Risk Score
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            {ward.riskScore}/5
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">
              Heat Index
            </span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            {currentTemp}°C
          </span>
        </div>

        {/* Live Weather Data from OpenWeatherMap */}
        {!loading && liveWeather && (
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Wind Speed
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {liveWeather.current.wind_speed} m/s
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Humidity
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {liveWeather.current.humidity}%
              </span>
            </div>
          </div>
        )}

        {loading && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-xs text-gray-500">Loading weather...</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">Alert Level</span>
          <span className="text-xl" title={`Alert Level: ${ward.alertLevel}`}>
            {getAlertIcon(ward.alertLevel)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WardCard;