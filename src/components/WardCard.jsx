import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, Thermometer, Cloud, Wind } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { getTemperatureColor } from '../utils/temperatureUtils';

const WardCard = ({ ward }) => {
  const { loading, wardTemperatures } = useWeather();

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

  // Get calculated ward temperature or fallback to static
  const currentTemp = wardTemperatures[ward.wardId] || parseFloat(ward.temperature);
  const tempColor = getTemperatureColor(currentTemp);

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
          className={`px-3 py-1 rounded-full text-[15px] font-bold border transition-all duration-300 ${tempColor.bg} ${tempColor.text}`}
        >
          {loading ? '...' : `${currentTemp}°C`}
        </span>
      </div>

      <div className="space-y-3">
        {/* Live Weather Data from OpenWeatherMap */}
        {!loading && (
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Wind Speed
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {ward.windSpeed || 'N/A'}
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
                {ward.humidity || 'N/A'}
              </span>
            </div>
          </div>
        )}

        {loading && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-xs text-gray-500">Loading...</span>
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