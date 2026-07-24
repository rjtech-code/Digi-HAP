const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age must be at most 120'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other',
    },
  },
  address: {
    type: String,
    default: '',
  },
  emergencyContactName: {
    type: String,
    default: '',
  },
  emergencyContactPhone: {
    type: String,
    default: '',
  },
  medicalConditions: {
    type: [String],
    default: [],
  },
  additionalInfo: {
    type: String,
    default: '',
  },
  declaration: {
    type: Boolean,
    required: [true, 'Declaration is required'],
    validate: {
      validator: function (value) {
        return value === true;
      },
      message: 'You must confirm the information',
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserProfile', userProfileSchema);