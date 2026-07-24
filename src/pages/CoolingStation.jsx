import { useState } from 'react';
import { Thermometer, Droplets, Heart, Shield, Users, UserPlus, Baby, Briefcase, Home, MapPin, ExternalLink, Wind, Sun, Wind as WindIcon, Crosshair, Waves, Navigation } from 'lucide-react';

const CoolingStation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('waiting'); // waiting, found, denied, error
  const [errorMessage, setErrorMessage] = useState('');

  const DESTINATION_LAT = 28.3047;
  const DESTINATION_LNG = 74.9676;

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setErrorMessage('Geolocation is not supported by your browser');
      return;
    }

    setLocationStatus('waiting');
    setErrorMessage('');

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
            setErrorMessage('Location permission was denied. Please enable location access to get directions.');
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
        maximumAge: 0
      }
    );
  };

  const getDirections = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${DESTINATION_LAT},${DESTINATION_LNG}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  const openDestinationOnMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${DESTINATION_LAT},${DESTINATION_LNG}`;
    window.open(url, '_blank');
  };
  const services = [
    { icon: Thermometer, title: 'Thermal Comfort & Shaded Resting Area' },
    { icon: Droplets, title: 'Clean Drinking Water' },
    { icon: Heart, title: 'Basic First Aid Support' },
    { icon: Shield, title: 'Safe Shelter During Heatwaves' },
    { icon: Users, title: 'Women Friendly' },
    { icon: UserPlus, title: 'Elderly Friendly' },
    { icon: Baby, title: 'Children Friendly' },
    { icon: Briefcase, title: 'Support for Sanitation Workers' },
    { icon: Home, title: 'Support for Street Vendors' },
    { icon: MapPin, title: 'Safe Resting Place for Commuters' },
  ];

  const keyFeatures = [
    { icon: Wind, title: 'Cement Sandwich Facing Panels', description: 'Durable and heat-resilient construction.' },
    { icon: Waves, title: 'Bison Panel Flooring', description: 'Strong and heat-resistant flooring.' },
    { icon: Droplets, title: 'Misting & Khus Curtains', description: '30 misting nozzles providing immediate cooling.' },
    { icon: Sun, title: 'Solar Power System', description: 'Runs fans, lights and sprinklers sustainably.' },
    { icon: WindIcon, title: 'Cross Ventilated Windows', description: 'Improves natural airflow.' },
    { icon: Crosshair, title: 'Health Support', description: 'Drinking water, ORS and first-aid available.' },
    { icon: Wind, title: 'Air Circulation Fans', description: 'Three fans providing improved comfort.' },
  ];

  const beneficiaries = [
    'Women', 'Children', 'Senior Citizens', 'Street Vendors',
    'Sanitation Workers', 'Informal Workers', 'Gig Workers', 'Nearby Residents', 'Daily Commuters'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Cooling Station</h1>
          <p className="text-xl text-gray-700 mb-6">Building Heat-Resilient Cities Through Sustainable Cooling</p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This page provides information about Churu's Net-Zero Cooling Station, established to protect citizens during extreme heat events through sustainable and climate-resilient infrastructure.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Information Card */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Cooling Station</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Responding proactively ahead of the peak summer season, Mahila Housing Trust (MHT), in partnership with the Churu Municipal Council, established a Net-Zero Cooling Station at Collectorate Circle, Churu.
            </p>
            <p>
              This Cooling Station is designed to combat extreme heat and protect vulnerable communities through sustainable and climate-resilient infrastructure.
            </p>
          </div>
        </section>

        {/* Services Available */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Services Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    {service.icon && <service.icon className="w-6 h-6 text-green-600" />}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About the Cooling Station */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Cooling Station</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The Net-Zero Cooling Station demonstrates how low-carbon and locally appropriate cooling solutions strengthen urban climate resilience.
            </p>
            <p>
              It contributes to India's National Cooling Action Plan (NCAP) while promoting inclusive, gender-responsive and people-centric climate action.
            </p>
          </div>
        </section>

        {/* Churu Heat Action Plan */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Churu Heat Action Plan (HAP)</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              On 21 May 2025, the city's first Heat Action Plan was launched, initiated by the Churu District Collector and Municipal Commissioner.
            </p>
            <p className="font-semibold text-gray-900">Co-developed by:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Churu Municipal Council</li>
              <li>Mahila Housing Trust</li>
              <li>Natural Resources Defense Council (NRDC)</li>
            </ul>
            <p>
              The plan combines scientific research, local knowledge and community participation to improve heat resilience.
            </p>
          </div>
        </section>

        {/* Why Churu Needs This */}
        <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 shadow-md border border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Churu Needs This</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
            <p>
              Churu is located near the Thar Desert, making it one of the hottest regions in India.
            </p>
            <p>
              In 2024, Churu recorded 50.5°C, one of India's highest recorded temperatures. This highlighted the urgent need for local heat adaptation strategies.
            </p>
          </div>
          <div className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
            <span className="text-3xl font-bold">50.5°C</span>
            <span className="block text-sm mt-1">Recorded in 2024</span>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {feature.icon && <feature.icon className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beneficiaries */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who Benefits?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {beneficiaries.map((beneficiary, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <p className="text-gray-900 font-medium">{beneficiary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Find the Cooling Station */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📍 Find the Cooling Station</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Quickly navigate to the Cooling Station during extreme heat conditions. Use your current location to get turn-by-turn directions via Google Maps.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Location Information */}
            <div className="space-y-6">
              {/* Destination Card */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📍 Destination</h3>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">Collectorate Circle</p>
                  <p className="text-gray-700">Churu, Rajasthan</p>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Status</h3>
                <div className="space-y-4">
                  {locationStatus === 'waiting' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-700">Waiting for Location</span>
                    </div>
                  )}
                  {locationStatus === 'found' && userLocation && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Location Found</span>
                      </div>
                      <div className="bg-white rounded-lg p-4 space-y-2">
                        <div>
                          <span className="text-sm text-gray-600">Current Latitude:</span>
                          <p className="text-lg font-semibold text-gray-900">{userLocation.latitude.toFixed(4)}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Current Longitude:</span>
                          <p className="text-lg font-semibold text-gray-900">{userLocation.longitude.toFixed(4)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {locationStatus === 'denied' && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Permission Denied</span>
                      </div>
                      <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errorMessage}</p>
                    </div>
                  )}
                  {locationStatus === 'error' && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Error</span>
                      </div>
                      <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errorMessage}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {locationStatus !== 'found' && (
                  <button
                    onClick={getCurrentLocation}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Use My Current Location</span>
                  </button>
                )}

                {locationStatus === 'found' && (
                  <button
                    onClick={getDirections}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Get Directions</span>
                  </button>
                )}

                {locationStatus === 'denied' && (
                  <button
                    onClick={openDestinationOnMaps}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Open Cooling Station on Google Maps</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Map Preview</h3>
              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 h-96">
                <iframe
                  title="Cooling Station Location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.678!2d${DESTINATION_LNG}!3d${DESTINATION_LAT}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI5JzE0LjAiTiA3NMKwNTMnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890`}
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
        </section>

        {/* Footer Information */}
        <section className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Mahila Housing Trust (MHT)</h3>
          <a
            href="https://www.mahilahousingtrust.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
          >
            <span>www.mahilahousingtrust.org</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </main>
    </div>
  );
};

export default CoolingStation;