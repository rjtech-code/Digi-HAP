const express = require('express');
const router = express.Router();
const { createProfile, getAllProfiles, getProfileById, deleteProfile } = require('../controllers/profileController');
const { validateProfile } = require('../middleware/validateRequest');

// @desc    Create a new profile
// @route   POST /api/profile
// @access  Public
router.post('/', validateProfile, createProfile);

// @desc    Get all profiles
// @route   GET /api/profile
// @access  Private (Admin only - for future use)
router.get('/', getAllProfiles);

// @desc    Get profile by ID
// @route   GET /api/profile/:id
// @access  Private (for future use)
router.get('/:id', getProfileById);

// @desc    Delete profile by ID
// @route   DELETE /api/profile/:id
// @access  Public
router.delete('/:id', deleteProfile);

module.exports = router;
