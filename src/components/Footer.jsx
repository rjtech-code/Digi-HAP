import { Link } from 'react-router-dom';
import { Phone, Heart, Shield, Sun } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/ward-temperature', label: 'Ward Temperature' },
    { path: '/cooling-station', label: 'Cooling Station' },
    { path: '/public-facilities', label: 'Public Facilities' },
    { path: '/create-profile', label: 'Create Profile' },
  ];

  const emergencyContacts = [
    { label: 'Emergency', number: '112', icon: Phone },
    { label: 'Police', number: '100', icon: Phone },
    { label: 'Fire', number: '101', icon: Phone },
    { label: 'Ambulance', number: '108', icon: Phone },
  ];

  const heatSafetyTips = [
    'Stay Hydrated',
    'Avoid Outdoor Activities During Peak Hours',
    'Wear Light Clothing',
    'Seek Shade Frequently',
  ];

  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1: DigiHAP Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">DigiHAP</h3>
            <p className="text-green-100 font-medium">Digital Heat Action Platform</p>
            <p className="text-green-200 text-sm leading-relaxed">
              Helping citizens stay safe during extreme heat through live ward monitoring, Cooling Stations, Public Facilities and heat awareness.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-green-200 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Emergency Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Emergency Information</h4>
            <ul className="space-y-3">
              {emergencyContacts.map((contact) => (
                <li key={contact.label} className="flex items-center space-x-2">
                  <contact.icon className="w-4 h-4 text-green-300" />
                  <span className="text-green-200 text-sm">{contact.label}:</span>
                  <span className="text-white font-semibold text-sm">{contact.number}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Heat Safety */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Heat Safety</h4>
            <ul className="space-y-2">
              {heatSafetyTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-green-200 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 5: Project Information */}
        <div className="mt-8 pt-8 border-t border-green-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-green-200 text-sm">
                Made for <span className="font-semibold text-white">Churu Municipal Heat Action Platform</span>
              </p>
              <p className="text-green-300 text-sm mt-1">Churu, Rajasthan</p>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-green-200 text-sm">Built with care for citizen safety</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-green-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-green-200 text-sm">
              © 2026 DigiHAP - Digital Heat Action Platform. All Rights Reserved.
            </p>
            <p className="text-green-300 text-sm">Version 1.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;