import { Link } from 'react-router-dom';
import { Trees, Toilet } from 'lucide-react';

const PublicFacilities = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Public Facilities</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Locate nearby public facilities in Churu to stay safe and comfortable during extreme heat.
          </p>
        </div>

        {/* Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Parks Card */}
          <Link
            to="/public-facilities/parks"
            className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                <Trees className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Parks</h2>
              <p className="text-gray-700 leading-relaxed">
                Find nearby public parks where you can relax under shaded areas.
              </p>
              <div className="pt-4">
                <span className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium group-hover:bg-green-700 transition-colors duration-200">
                  <span>Explore Parks</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Public Toilets Card */}
          <Link
            to="/public-facilities/toilets"
            className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <Toilet className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Public Toilets</h2>
              <p className="text-gray-700 leading-relaxed">
                Locate nearby public toilets across Churu city.
              </p>
              <div className="pt-4">
                <span className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium group-hover:bg-blue-700 transition-colors duration-200">
                  <span>Explore Toilets</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicFacilities;