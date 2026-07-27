import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  Cake,
  Calendar,
  CheckCircle2,
  FileText,
  HeartPulse,
  Loader2,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Trash2,
  User,
  Users,
} from 'lucide-react';
import apiClient from '../services/apiClient';

const PROFILE_STORAGE_KEY = 'digihapProfileId';

const formatDate = (date) => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 rounded-xl border border-green-100 bg-green-50/40 p-4">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm">
      <Icon className="h-5 w-5" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 break-words text-base font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalConditions: [],
    additionalInfo: '',
    declaration: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const medicalConditionOptions = [
    'Diabetes',
    'High Blood Pressure',
    'Heart Disease',
    'Asthma',
    'Kidney Disease',
    'Respiratory Disease',
    'Pregnant',
    'Senior Citizen (60+)',
    'Physical Disability',
    'Other',
    'None',
  ];

  useEffect(() => {
    const loadSavedProfile = async () => {
      const savedProfileId = localStorage.getItem(PROFILE_STORAGE_KEY);

      if (!savedProfileId) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        const response = await apiClient.get(`/api/profile/${savedProfileId}`);
        setProfile(response.data.data);
      } catch (error) {
        console.error('Error loading saved profile:', error);
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadSavedProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? e.target.checked : value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMedicalConditionChange = (condition) => {
    setFormData((prev) => {
      let newConditions;

      if (condition === 'None') {
        // If "None" is selected, uncheck all others
        newConditions = ['None'];
      } else {
        // If any other condition is selected, remove "None" and add the condition
        newConditions = prev.medicalConditions.filter((c) => c !== 'None');
        
        if (newConditions.includes(condition)) {
          newConditions = newConditions.filter((c) => c !== condition);
        } else {
          newConditions = [...newConditions, condition];
        }
      }

      return { ...prev, medicalConditions: newConditions };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    // Declaration validation
    if (!formData.declaration) {
      newErrors.declaration = 'You must confirm the information';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.post('/api/profile', {
        ...formData,
        age: parseInt(formData.age),
        declaration: true,
      });

      console.log('Profile Created:', response.data);
      setIsSubmitting(false);
      localStorage.setItem(PROFILE_STORAGE_KEY, response.data.data._id);
      setProfile(response.data.data);
      setSuccessMessage('Profile created successfully.');
      setShowSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error creating profile:', error);
      
      // Show error message
      const errorMessage = error.response?.data?.message || 'Failed to create profile. Please try again.';
      alert(errorMessage);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      age: '',
      gender: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      medicalConditions: [],
      additionalInfo: '',
      declaration: false,
    });
    setErrors({});
  };

  const handleDeleteProfile = async () => {
    if (!profile?._id) {
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete your profile?');

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await apiClient.delete(`/api/profile/${profile._id}`);
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      setProfile(null);
      setSuccessMessage('Profile deleted successfully.');
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error deleting profile:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete profile. Please try again.';
      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderMedicalConditions = () => {
    const conditions = profile?.medicalConditions || [];

    if (conditions.length === 0 || conditions.includes('None')) {
      return (
        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
          No Medical Conditions
        </span>
      );
    }

    return conditions.map((condition) => (
      <span
        key={condition}
        className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800"
      >
        {condition}
      </span>
    ));
  };

  if (isLoadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white px-6 py-4 text-green-700 shadow-lg">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-4xl font-bold text-gray-900 sm:text-5xl">My Profile</h1>
            <p className="text-base text-gray-600 sm:text-lg">
              Your DigiHAP citizen profile is saved on this device.
            </p>
          </div>

          {showSuccess && (
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-5 shadow-sm">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
              <p className="font-semibold text-green-800">{successMessage}</p>
            </div>
          )}

          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-8 flex flex-col gap-5 border-b border-green-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                    <BadgeCheck className="h-4 w-4" />
                    <span>Profile Active</span>
                  </div>
                  <h2 className="break-words text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ProfileField icon={User} label="Name" value={profile.fullName} />
              <ProfileField icon={Smartphone} label="Phone Number" value={profile.phone} />
              <ProfileField icon={Mail} label="Email Address" value={profile.email} />
              <ProfileField icon={Cake} label="Age" value={profile.age} />
              <ProfileField icon={Users} label="Gender" value={profile.gender} />
              <ProfileField icon={PhoneCall} label="Emergency Contact Name" value={profile.emergencyContactName} />
              <ProfileField icon={Phone} label="Emergency Contact Number" value={profile.emergencyContactPhone} />
              <ProfileField icon={Calendar} label="Profile Created Date" value={formatDate(profile.createdAt)} />
            </div>

            <div className="mt-4 rounded-xl border border-green-100 bg-green-50/40 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Medical Conditions</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">{renderMedicalConditions()}</div>
            </div>

            <div className="mt-4 rounded-xl border border-green-100 bg-green-50/40 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Additional Information</p>
                </div>
              </div>
              <p className="whitespace-pre-wrap break-words text-base font-semibold text-gray-900">
                {profile.additionalInfo}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Create Your Profile</h1>
          <p className="text-xl text-gray-700 mb-6">
            Help us understand your health profile so we can support vulnerable citizens during extreme heat situations.
          </p>

          {/* Information Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Information</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This profile is completely optional. Your information will only be used to improve heat-related assistance and public health response.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 flex items-center space-x-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-semibold text-lg">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Personal Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your mobile number"
                  maxLength="10"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="1"
                  max="120"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your age"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Gender */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Address</h2>
            </div>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Enter your address"
            ></textarea>
          </div>

          {/* Section 3: Emergency Contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <PhoneCall className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Emergency Contact</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Phone Number
                </label>
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter emergency contact phone"
                  maxLength="10"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Physical Health Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <HeartPulse className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Physical Health Information</h2>
                <p className="text-sm text-gray-600 mt-1">Select all conditions that apply</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalConditionOptions.map((condition) => (
                <label
                  key={condition}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={formData.medicalConditions.includes(condition)}
                    onChange={() => handleMedicalConditionChange(condition)}
                    className="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
                  />
                  <span className="text-gray-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 5: Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>
            </div>

            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Any additional health-related information... (Optional)"
            ></textarea>
          </div>

          {/* Section 6: Declaration */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleInputChange}
                className="w-5 h-5 text-green-600 focus:ring-green-500 rounded mt-1"
              />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                  I confirm that the information provided is true to the best of my knowledge. <span className="text-red-500">*</span>
                </label>
                {errors.declaration && <p className="text-red-500 text-sm mt-1">{errors.declaration}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="submit"
              disabled={!formData.declaration || isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Profile...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Create Profile</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              <span>Reset Form</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
