const UserProfile = require('../models/UserProfile');

// @desc    Create a new user profile
// @route   POST /api/profile
// @access  Public
const createProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      age,
      gender,
      address,
      emergencyContactName,
      emergencyContactPhone,
      medicalConditions,
      additionalInfo,
      declaration,
    } = req.body;

    // Create profile
    const profile = await UserProfile.create({
      fullName,
      phone,
      email,
      age,
      gender,
      address,
      emergencyContactName,
      emergencyContactPhone,
      medicalConditions,
      additionalInfo,
      declaration,
    });

    // Check if medical conditions require email notification (excluding "None")
    const hasMedicalConditions = medicalConditions && 
      medicalConditions.length > 0 && 
      !medicalConditions.includes('None');

    if (hasMedicalConditions) {
      // Prepare data for future email integration
      await prepareMedicalAlert(profile);
    }

    res.status(201).json({
      success: true,
      message: 'Profile created successfully.',
      data: profile,
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create profile.',
      error: error.message,
    });
  }
};

// @desc    Prepare medical alert data for future email integration
// @route   N/A (Internal function)
// @access  Private
const prepareMedicalAlert = async (profile) => {
  // This function prepares the data for email notification
  // Email integration will be added later
  
  const alertData = {
    profileId: profile._id,
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    medicalConditions: profile.medicalConditions,
    age: profile.age,
    gender: profile.gender,
    address: profile.address,
    emergencyContactName: profile.emergencyContactName,
    emergencyContactPhone: profile.emergencyContactPhone,
    createdAt: profile.createdAt,
  };

  // Log the alert data (for demonstration)
  console.log('Medical Alert Prepared:', alertData);
  
  // TODO: Integrate email service here
  // await sendEmailNotification(alertData);
  
  return alertData;
};

// @desc    Get all profiles (for future admin dashboard)
// @route   GET /api/profile
// @access  Private (Admin only)
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profiles.',
      error: error.message,
    });
  }
};

// @desc    Get profile by ID (for future use)
// @route   GET /api/profile/:id
// @access  Private
const getProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile.',
      error: error.message,
    });
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
};