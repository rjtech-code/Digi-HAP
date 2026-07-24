import { Link } from 'react-router-dom';
import { MapPin, AlertTriangle, Thermometer } from 'lucide-react';

const WardCard = ({ ward }) => {
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
            ward.status
          )}`}
        >
          {ward.temperature}
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
            {ward.heatIndex}
          </span>
        </div>

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