import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Cloud, Wind, Thermometer, Droplets } from 'lucide-react';
import WardCard from '../components/WardCard';
import { wards } from '../data/wards';
import { fetchWeatherByCoords } from '../services/weatherService';

const WardTemperature = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [liveWeather, setLiveWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch live weather for Churu center
  useEffect(() => {
    const loadChuruWeather = async () => {
      const result = await fetchWeatherByCoords(28.3000, 74.9600); // Churu center coordinates
      
      if (result.success) {
        setLiveWeather(result.data);
      }
      setLoading(false);
    };

    loadChuruWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Live Weather Summary Banner */}
        {!loading && liveWeather && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Live Weather - Churu District</h2>
                <p className="text-sm text-gray-600">Real-time weather data from OpenWeatherMap</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-xs text-gray-600">Temperature</p>
                    <p className="text-lg font-bold text-gray-900">{Math.round(liveWeather.current.temp)}°C</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Humidity</p>
                    <p className="text-lg font-bold text-gray-900">{liveWeather.current.humidity}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Wind className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Wind Speed</p>
                    <p className="text-lg font-bold text-gray-900">{liveWeather.current.wind_speed} m/s</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Cloud className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Condition</p>
                    <p className="text-lg font-bold text-gray-900 capitalize">{liveWeather.current.weather[0]?.description || 'Clear'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="mb-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-sm text-gray-600">Loading live weather data...</span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Sticky Map Panel (Desktop) */}
          <div className="hidden lg:block lg:w-[40%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Churu District Map
              </h2>
              <div className="flex-1 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28104.128043320507!2d74.94619817874212!3d28.297839291455283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39136200b18a66a3%3A0x3e487bf6934c8306!2sChuru%2C%20Rajasthan%20331001!5e0!3m2!1sen!2sin!4v1784874954879!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Churu District Map"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Ward Cards Grid */}
          <div className="flex-1 p-6 lg:w-[70%]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Ward Temperature Status
              </h2>
              <p className="text-gray-600 mt-1">
                Real-time temperature monitoring across all wards
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {wards.map((ward) => (
                <WardCard key={ward.wardId} ward={ward} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Map Button */}
      <button
        onClick={() => setIsMapOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 hover:shadow-xl"
        aria-label="Open map"
      >
        <Map className="w-6 h-6" />
      </button>

      {/* Mobile Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
              onClick={() => setIsMapOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-x-0 bottom-0 top-10 bg-white rounded-t-2xl shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Churu District Map
                </h2>
                <button
                  onClick={() => setIsMapOpen(false)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Close map"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Map Content */}
              <div className="flex-1 p-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28104.128043320507!2d74.94619817874212!3d28.297839291455283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39136200b18a66a3%3A0x3e487bf6934c8306!2sChuru%2C%20Rajasthan%20331001!5e0!3m2!1sen!2sin!4v1784874954879!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Churu District Map"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WardTemperature;