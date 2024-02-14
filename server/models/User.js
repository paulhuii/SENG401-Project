/**
 * User Model
 * 
 * This model represents a user in the JobHub application.
 * It defines the structure and schema for user data stored in the MongoDB database.
 * 
 * Schema:
 * - name: String (required) - Represents the name of the user.
 * - username: String (required, unique) - Represents the username of the user.
 * - email: String (required, unique) - Represents the email address of the user.
 * - password: String (required) - Represents the password of the user.
 * - role: String (required, enum) - Represents the role of the user (either 'recruiter' or 'jobseeker').
 * 
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user ('recruiter' or 'jobseeker').
 * @property {string} gender - The gender the user wishes to idenfiy. 
 * 
 * @typedef {import('mongoose').Model<User>} User
 */

// Import mongoose library
const mongoose = require('mongoose');

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
    enum: ['recruiter', 'jobseeker'], // Define possible roles
    required: true
  },

  gender: {
    type: String, 
    enum: ['female', 'male', 'non-binary'],
    required: true
  },

});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
