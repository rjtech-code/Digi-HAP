import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, AtSign, PhoneIcon, HelpCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const contactInfo = [
    { icon: MapPin, title: 'Address', details: ['Map IT Incubation Center', 'Churu, Rajasthan'] },
    { icon: Phone, title: 'Phone', details: ['+91 XXXXX XXXXX'] },
    { icon: Mail, title: 'Email', details: ['support@digihap.in'] },
    { icon: Clock, title: 'Office Hours', details: ['Monday – Friday', '9:00 AM – 6:00 PM'] },
  ];

  const emergencyContacts = [
    { icon: '🚑', label: 'Ambulance', number: '108' },
    { icon: '🚓', label: 'Police', number: '100' },
    { icon: '🚒', label: 'Fire', number: '101' },
    { icon: '📞', label: 'Emergency', number: '112' },
  ];

  const faqs = [
    {
      question: 'How can I report incorrect ward information?',
      answer: 'You can report incorrect ward information by using the contact form on this page or by contacting the Churu Municipal Council directly. Please provide the ward number and the correct information.',
    },
    {
      question: 'How do I find the nearest Cooling Station?',
      answer: 'Visit the Cooling Station page from the navigation menu. The page provides location details and Google Maps navigation to help you find the nearest Cooling Station.',
    },
    {
      question: 'How can I update my profile?',
      answer: 'Click on "Create Profile" in the navigation menu to create or update your profile. You can voluntarily register your basic information to receive better support.',
    },
    {
      question: 'How do I locate nearby Public Facilities?',
      answer: 'Go to the Public Facilities section from the navigation menu. You can find parks and other public facilities near your location using the geolocation feature.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-2xl text-gray-700 mb-6">We're here to help you stay safe during extreme heat.</p>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
            If you have any questions, suggestions, or need assistance regarding DigiHAP, feel free to contact us. Our team is committed to helping citizens access heat-related information and public services.
          </p>
        </div>
      </section>

      {/* Section 2: Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                </div>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Contact Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-700 leading-relaxed">
                Have a question or feedback? Fill out the form and our team will get back to you as soon as possible.
              </p>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Contact Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Report issues or incorrect information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Suggest new features or improvements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Request support or assistance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Partner with us for community initiatives</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

              {showSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <Send className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 font-medium">Your message has been submitted successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <div className={`transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Emergency Contacts */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Emergency Contacts</h2>
          <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            In case of a heat-related emergency, immediately contact the nearest healthcare facility or emergency services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 text-center"
              >
                <div className="text-4xl mb-3">{contact.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.label}</h3>
                <p className="text-2xl font-bold text-green-600">{contact.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;