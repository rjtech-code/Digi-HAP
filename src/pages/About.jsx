import { Thermometer, Snowflake, Trees, UserRound, BarChart3, Shield, Heart, Users, Building2, Hospital, Leaf, HandHeart, Target, Award } from 'lucide-react';

const About = () => {
  const features = [
    { icon: Thermometer, title: 'Live Ward Temperature Monitoring', description: 'Real-time ward-wise heat information and risk assessment.' },
    { icon: Snowflake, title: 'Cooling Station Information', description: 'Locate Cooling Stations and navigate to them using Google Maps.' },
    { icon: Trees, title: 'Public Facilities', description: 'Find nearby parks and public facilities during heatwaves.' },
    { icon: UserRound, title: 'Citizen Profile', description: 'Allow users to voluntarily register basic information to receive better support.' },
    { icon: BarChart3, title: 'Heat Awareness', description: 'Educational content and heat safety recommendations.' },
    { icon: Shield, title: 'Emergency Preparedness', description: 'Helping citizens stay informed and protected during extreme weather.' },
  ];

  const benefits = [
    'Heat Risk Awareness',
    'Community Safety',
    'Climate Resilience',
    'Easy Navigation',
    'Public Health Support',
    'Smart City Initiative',
  ];

  const partners = [
    { icon: Building2, name: 'Churu Municipal Council', description: 'Local governance and administration' },
    { icon: Hospital, name: 'Healthcare Institutions', description: 'Medical support and health services' },
    { icon: Leaf, name: 'Climate Action Partners', description: 'Environmental and climate organizations' },
    { icon: Users, name: 'Community Volunteers', description: 'Dedicated volunteers and community workers' },
  ];

  const goals = [
    'Improve public awareness about heatwaves.',
    'Provide easy access to Cooling Stations.',
    'Help citizens locate nearby public facilities.',
    'Support climate-resilient urban planning.',
    'Improve community health and safety.',
  ];

  const stats = [
    { value: '60+', label: 'Municipal Wards' },
    { value: '1', label: 'Cooling Station' },
    { value: 'Multiple', label: 'Public Facilities' },
    { value: '24×7', label: 'Heat Awareness' },
    { value: 'Citizen', label: 'Focused' },
    { value: 'Community', label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Thermometer className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About DigiHAP</h1>
          <p className="text-2xl text-gray-700 mb-6">Digital Heat Action Platform for Churu</p>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
            DigiHAP is a citizen-centric platform developed to improve public awareness, strengthen heat resilience, and provide real-time information related to extreme heat conditions in Churu. It helps residents access heat-related resources, monitor ward conditions, locate Cooling Stations and Public Facilities, and stay informed during heatwaves.
          </p>
        </div>
      </section>

      {/* Section 2: Our Mission */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To protect the people of Churu from the impacts of extreme heat by providing accurate information, improving access to public facilities, promoting climate resilience, and supporting informed decision-making through digital technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To build a heat-resilient Churu where every citizen has easy access to timely information, cooling infrastructure, and essential public services during periods of extreme weather.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What DigiHAP Offers */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What DigiHAP Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Why DigiHAP */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why DigiHAP</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{benefit}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Our Partners */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Our Goals */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Goals</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed pt-2">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Project Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Project Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md p-6 border border-green-200 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-gray-700 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Contact / Support */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                If you have suggestions or need assistance regarding DigiHAP, please contact the Churu Municipal Administration.
              </p>
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <p className="text-gray-700 mb-2">
                  <strong>Contact:</strong> Churu Municipal Council
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> Churu, Rajasthan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;