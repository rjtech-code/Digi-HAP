import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Thermometer, Droplets, Wind, Clock, AlertTriangle, Shield, Heart, Phone, MapPin, Users, ChevronLeft, ChevronRight, Cloud } from 'lucide-react';
import { wards } from '../data/wards';
import { useWeather } from '../context/WeatherContext';
import { getTemperatureColor } from '../utils/temperatureUtils';

const WardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentWardId = parseInt(id);
  const ward = wards.find(w => w.wardId === currentWardId);
  const { loading, wardTemperatures } = useWeather();

  // Navigation handlers
  const goToPreviousWard = () => {
    if (currentWardId > 1) {
      navigate(`/ward/${currentWardId - 1}`);
    }
  };

  const goToNextWard = () => {
    if (currentWardId < 60) {
      navigate(`/ward/${currentWardId + 1}`);
    }
  };

  if (!ward) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ward Not Found</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-700 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Ward Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Previous Ward Button */}
          <button
            onClick={goToPreviousWard}
            disabled={currentWardId === 1}
            className={`flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentWardId === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-600 shadow-sm hover:shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous Ward</span>
          </button>

          {/* Next Ward Button */}
          <button
            onClick={goToNextWard}
            disabled={currentWardId === 60}
            className={`flex-1 inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentWardId === 60
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-600 shadow-sm hover:shadow-md'
            }`}
          >
            <span>Next Ward</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {ward.wardName}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(ward.status)}`}>
                  {ward.status}
                </span>
                <span className="text-lg font-semibold text-gray-700">
                  Risk Score: {ward.riskScore}/5
                </span>
                <span className="text-2xl" title={`Alert Level: ${ward.alertLevel}`}>
                  {getAlertIcon(ward.alertLevel)}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Temperature</span>
              </div>
              {loading ? (
                <p className="text-2xl font-bold text-gray-900">Loading...</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {wardTemperatures[currentWardId] ? `${wardTemperatures[currentWardId]}°C` : 'N/A'}
                </p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Humidity</span>
              </div>
              {loading ? (
                <p className="text-2xl font-bold text-gray-900">Loading...</p>
              ) : error ? (
                <p className="text-2xl font-bold text-gray-900">N/A</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{ward.humidity || 0}%</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Wind Speed</span>
              </div>
              {loading ? (
                <p className="text-2xl font-bold text-gray-900">Loading...</p>
              ) : error ? (
                <p className="text-2xl font-bold text-gray-900">N/A</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900">{ward.windSpeed || 0} m/s</p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Cloud className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Condition</span>
              </div>
              {loading ? (
                <p className="text-2xl font-bold text-gray-900">Loading...</p>
              ) : error ? (
                <p className="text-2xl font-bold text-gray-900">N/A</p>
              ) : (
                <p className="text-2xl font-bold text-gray-900 capitalize">{ward.weatherCondition || 'Clear'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Heat Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
            Heat Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Risk Category</p>
              <p className="text-xl font-bold text-gray-900">{ward.riskCategory}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Heat Index</p>
              <p className="text-xl font-bold text-gray-900">{ward.heatIndex}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Alert Level</p>
              <p className="text-xl font-bold text-gray-900 flex items-center">
                {ward.alertLevel} {getAlertIcon(ward.alertLevel)}
              </p>
            </div>
          </div>
        </div>

        {/* Why This Ward Has High Heat */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-red-600" />
            Why This Ward Has High Heat
          </h2>
          <ul className="space-y-2">
            {ward.reasons.map((reason, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-600 mt-1">•</span>
                <span className="text-gray-700">{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prevention Tips */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-pink-600" />
            Prevention Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ward.preventionTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500"
              >
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Heat Stroke Symptoms */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
            Heat Stroke Symptoms
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="space-y-2">
              {ward.heatStrokeSymptoms.map((symptom, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">⚠</span>
                  <span className="text-gray-800 font-medium">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Health Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-green-600" />
            Health Recommendations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-900">Water Intake</p>
              </div>
              <p className="text-gray-700">{ward.recommendedWaterIntake}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <p className="font-semibold text-gray-900">Best Visiting Time</p>
              </div>
              <p className="text-gray-700">{ward.bestVisitingTime}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="w-5 h-5 text-orange-600" />
                <p className="font-semibold text-gray-900">Outdoor Activity</p>
              </div>
              <p className="text-gray-700">{ward.outdoorActivityAdvice}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <p className="font-semibold text-gray-900">Vulnerable Population</p>
              </div>
              <p className="text-gray-700">{ward.vulnerablePopulation.join(', ')}</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 sm:col-span-2">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-5 h-5 text-red-600" />
                <p className="font-semibold text-gray-900">Emergency</p>
              </div>
              <p className="text-gray-700">{ward.emergencyRecommendation}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 sm:col-span-2">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-gray-900">Nearest Cooling Center</p>
              </div>
              <p className="text-gray-700">{ward.nearestCoolingCenter}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardDetails;