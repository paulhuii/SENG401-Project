/**
 * User Model
 * 
 * This model represents a user in the JobHub application.
 * It defines the structure and schema for user data stored in the MongoDB database.
 * 
 * Schema:
 * - uniqueID: ObjectId (auto-generated) - The unique identifier for the user document in the MongoDB collection.
 * - name: String (required) - The name of the user.
 * - username: String (required, unique) - The username of the user.
 * - email: String (required, unique) - The email address of the user.
 * - password: String (required) - The password of the user.
 * - role: String (required, enum) - The role of the user, either 'Recruiter' or 'Jobseeker'.
 * - gender: String (required, enum) - The gender of the user, either 'Female', 'Male', or 'Non-binary'.
 * - description: String (optional) - Additional description or information about the user.
 * - jobs: Array of ObjectIds - References to job documents that the user has applied to.
 * 
 * @typedef {Object} User
 * @property {ObjectId} uniqueID - The unique identifier for the user document.
 * @property {string} name - The name of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user, either 'Recruiter' or 'Jobseeker'.
 * @property {string} gender - The gender of the user, either 'Female', 'Male', or 'Non-binary'.
 * @property {string} [description] - Additional description or information about the user (optional).
 * @property {ObjectId[]} jobs - References to job documents that the user has applied to.
 */

// Import mongoose library
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // uniqueID: {
  //   type: Schema.Types.ObjectId,
  //   default: mongoose.Types.ObjectId,
  // },
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
  jobs: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Job' // Reference to the Job model
  }],
  profile_photo: {
    type: String,
    required: false
  }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
