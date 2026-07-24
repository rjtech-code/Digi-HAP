import { useParams } from 'react-router-dom';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { parks, calculateDistance } from '../data/parks';

const ParkDetails = () => {
  const { id } = useParams();
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('waiting');

  const park = parks.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setLocationStatus('found');
        },
        (error) => {
          setLocationStatus('denied');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocationStatus('error');
    }
  }, []);

  if (!park) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Park Not Found</h1>
          <p className="text-gray-700">The park you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const distance = userLocation
    ? calculateDistance(userLocation.latitude, userLocation.longitude, park.latitude, park.longitude)
    : null;

  const getNavigationUrl = () => {
    if (userLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${park.latitude},${park.longitude}&travelmode=walking`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Information */}
          <div className="space-y-6">
            {/* Park Name */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{park.name}</h1>

              {/* Distance */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Distance from You</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {distance !== null ? `${distance.toFixed(1)} km` : 'Distance unavailable'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Latitude</p>
                    <p className="text-lg font-semibold text-gray-900">{park.latitude.toFixed(6)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Longitude</p>
                    <p className="text-lg font-semibold text-gray-900">{park.longitude.toFixed(6)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-semibold text-green-600">Open Location</p>
                  </div>
                </div>
              </div>

              {/* Navigation Button */}
              <div className="mt-8">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Navigate with Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Location Preview</h3>
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 h-96">
              <iframe
                title={`${park.name} Location`}
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.678!2d${park.longitude}!3d${park.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI5JzE0LjAiTiA3NMKwNTMnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetails;