import { Toilet } from 'lucide-react';

const PublicToilets = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Public Toilets</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Locate nearby public toilets across Churu city.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Toilet className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Public toilet information is currently being collected and will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicToilets;