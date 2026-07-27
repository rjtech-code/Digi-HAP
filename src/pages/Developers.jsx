import { BadgeCheck, GraduationCap, Users, HeartHandshake } from 'lucide-react';

const Developers = () => {
  const districtMagistrate = {
    name: 'Abhishek Surana',
    designation: 'District Magistrate',
    description: 'Providing visionary leadership and unwavering support to the DigiHAP initiative. Their commitment to public welfare and climate resilience has been instrumental in transforming the Heat Action Plan into a citizen-centric digital platform.',
    image: '/Images/dm image.png',
    badge: 'Leadership',
  };

  const mentor = {
    name: 'Gaurav Sharma',
    designation: 'Mentor',
    organization: 'District Government Churu',
    description: 'Providing invaluable guidance, mentorship, and strategic direction to the DigiHAP development team. Their expertise in climate action and community engagement has shaped the platform\'s approach to heat resilience.',
    image: '/Images/mentor image.png',
    badge: 'Mentor',
  };

  const teamMembers = [
    {
      name: 'Mohit Darji',
      role: 'Prject Lead',
      description: 'Responsible for project architecture, frontend development, backend development, API integration, database management, deployment, and overall system implementation.',
      image: '/Images/mohit image.png',
      email: 'mohitdarji0213@example.com',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'Mayank Sharma',
      role: 'Full Stack Developer',
      description: 'Responsible for UI/UX development, frontend implementation, backend support, testing, optimization, debugging, and feature development.',
      image: '/Images/mayank image.png',
      email: 'mayankmaharshi01@example.com',
      github: '#',
      linkedin: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Meet the People Behind DigiHAP</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            DigiHAP is the result of the collaborative efforts of visionary leadership, dedicated mentorship, and a passionate development team working together to build a heat-resilient Churu.
          </p>
        </div>
      </section>

      {/* Section 1: Our District Magistrate */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <BadgeCheck className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Our District Magistrate</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={districtMagistrate.image}
                  alt={districtMagistrate.name}
                  loading="lazy"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Information */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                  {districtMagistrate.badge}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{districtMagistrate.name}</h3>
                <p className="text-lg text-gray-600 font-medium">{districtMagistrate.designation}</p>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {districtMagistrate.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Mentor */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-900">Our Mentor</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  loading="lazy"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Information */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                  {mentor.badge}
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{mentor.name}</h3>
                <p className="text-lg text-gray-600 font-medium">
                  {mentor.designation}
                  {mentor.organization && <span className="text-gray-500"> at {mentor.organization}</span>}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {mentor.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Team */}
      <section className="py-16 px-4 mx-auto w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <Users className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-900">Our Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-green-300 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Top 40% - Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Bottom 60% - Information Section */}
                <div className="p-8">
                  {/* Member Info */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    
                    {/* Role Badge */}
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {member.role}
                    </span>
                    
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                    
                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-green-600 transition-colors duration-200" title="Email">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors duration-200" title="GitHub">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-600 transition-colors duration-200" title="LinkedIn">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67v-5.59c0-1.397-.025-3.185-1.947-3.185-1.947 0-2.247 1.527-2.247 3.105v5.67H6.874V8.89c0-2.522-.025-4.575-1.758-4.575-1.758 0-1.99 1.374-1.99 2.79v5.733H2.5V4.17h3.096v.77c.46-.71 1.29-1.72 3.1-1.72 2.26 0 3.947 1.48 3.947 4.29v6.31zM5.5 2.5C4.12 2.5 3 3.62 3 5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Appreciation Message */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 md:p-8 border border-green-200">
              <p className="text-gray-700 leading-relaxed text-center">
                Together, our development team is committed to building innovative digital solutions that enhance public safety, climate resilience, and citizen services through DigiHAP.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Developers;