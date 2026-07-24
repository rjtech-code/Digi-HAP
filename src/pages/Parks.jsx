import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';
import { parks, calculateDistance } from '../data/parks';

const Parks = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('waiting');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Automatically request location when page loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLocationStatus('found');
        },
        (error) => {
          setLocationStatus('denied');
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage('Location permission is required to calculate the nearest public facilities.');
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setErrorMessage('The request to get your location timed out.');
              break;
            default:
              setErrorMessage('An unknown error occurred while retrieving your location.');
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationStatus('error');
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  }, []);

  // Calculate distances and sort parks
  const parksWithDistance = parks
    .map((park) => {
      let distance = null;
      if (userLocation) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          park.latitude,
          park.longitude
        );
      }
      return { ...park, distance };
    })
    .sort((a, b) => {
      if (a.distance === null && b.distance === null) return 0;
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });

  const getNavigationUrl = (park) => {
    if (userLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${park.latitude},${park.longitude}&travelmode=walking`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Parks</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Find nearby public parks where you can relax under shaded areas.
          </p>
        </div>

        {/* Location Status */}
        {locationStatus === 'denied' && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 font-medium">Location Permission Required</p>
                <p className="text-yellow-700 text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {locationStatus === 'error' && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Error</p>
                <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Parks List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {parksWithDistance.map((park, index) => (
            <div
              key={park.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-semibold text-gray-500">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-gray-900">{park.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {park.distance !== null ? `${park.distance.toFixed(1)} km away` : 'Distance unavailable'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/public-facilities/parks/${park.id}`}
                    className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
                  >
                    <span>View Details</span>
                  </Link>
                  <a
                    href={getNavigationUrl(park)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parks;