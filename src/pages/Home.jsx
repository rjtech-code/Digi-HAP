import { Link } from 'react-router-dom';
import { Thermometer, MapPin, Shield, Users, Droplets, Heart, Sun, Wind } from 'lucide-react';

const Home = () => {
  const heatSafetyTips = [
    { icon: Droplets, title: 'Stay Hydrated', description: 'Drink plenty of water throughout the day' },
    { icon: Sun, title: 'Avoid Peak Sun Hours', description: 'Limit outdoor activities between 11 AM and 4 PM' },
    { icon: Wind, title: 'Wear Light Clothing', description: 'Choose loose, light-colored, breathable fabrics' },
    { icon: Shield, title: 'Use Shade', description: 'Stay in shaded areas when outdoors' },
    { icon: Heart, title: 'Watch for Heat Stroke Symptoms', description: 'Monitor for dizziness, nausea, and confusion' },
    { icon: MapPin, title: 'Emergency Helpline', description: 'Call 108 for medical emergencies' },
  ];

  const quickStats = [
    { value: '60', label: 'Wards Monitored' },
    { value: '1', label: 'Cooling Station' },
    { value: '24×7', label: 'Heat Awareness' },
    { value: '100%', label: 'Community Safety' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">DigiHAP</h1>
          <p className="text-2xl text-gray-700 mb-6">Digital Heat Action Platform</p>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            DigiHAP helps citizens monitor heat conditions, understand heat risks, locate Cooling Stations, and stay protected during extreme weather events. Our platform is designed to enhance heat resilience and ensure public safety in Churu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ward-temperature"
              className="flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Thermometer className="w-5 h-5" />
              <span>View Temperatures</span>
            </Link>
            <Link
              to="/cooling-station"
              className="flex items-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200"
            >
              <MapPin className="w-5 h-5" />
              <span>Cooling Station</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About DigiHAP */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About DigiHAP</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              DigiHAP is a comprehensive digital platform designed to combat extreme heat and build climate resilience in Churu, Rajasthan. Our mission is to provide real-time heat monitoring, public awareness, and accessible cooling solutions to protect citizens during extreme weather events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <Shield className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Heat Resilience</h3>
                <p className="text-gray-700">Building community capacity to adapt and respond to extreme heat conditions.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Public Awareness</h3>
                <p className="text-gray-700">Educating citizens about heat risks, prevention, and safety measures.</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <Heart className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Citizen Safety</h3>
                <p className="text-gray-700">Ensuring the safety and well-being of all residents during heat waves.</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <MapPin className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart City Initiative</h3>
                <p className="text-gray-700">Leveraging technology for sustainable urban climate action and resilience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ward Temperature Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ward Temperature Monitoring</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Monitor heat conditions across all 60 wards of Churu in real-time. Access detailed temperature data, risk scores, and heat indices to stay informed about local conditions.
          </p>
          <Link
            to="/ward-temperature"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Thermometer className="w-5 h-5" />
            <span>View All Wards</span>
          </Link>
        </div>
      </section>

      {/* Cooling Station Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Cooling Station</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Visit Churu's Net-Zero Cooling Station at Collectorate Circle for relief during extreme heat. The station provides essential services including drinking water, shaded resting areas, first aid support, and a safe shelter during heatwaves.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                <Droplets className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Drinking Water</h3>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                <Shield className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Resting Area</h3>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                <Heart className="w-10 h-10 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">First Aid</h3>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 text-center">
                <MapPin className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Climate Resilience</h3>
              </div>
            </div>
            <div className="text-center">
              <Link
                to="/cooling-station"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <MapPin className="w-5 h-5" />
                <span>Explore Cooling Station</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Heat Safety Tips */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Heat Safety Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {heatSafetyTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <tip.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Quick Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md p-8 border border-green-200 text-center"
              >
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;