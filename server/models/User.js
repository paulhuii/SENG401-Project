// Import mongoose library
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email addresses are unique
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Recruiter', 'Jobseeker'], // Define possible roles
    required: true
  },

  gender: {
    type: String,
    enum: ['Female', 'Male', 'Non-binary'],
    required: true
  },

  description: {
    type: String,
    required: false
  }, 

  profile_photo: {
    type: String,
    required: false
  }

});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
