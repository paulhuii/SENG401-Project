/**
 * Job Model
 * 
 * This model represents a job listing in the JobHub application.
 * It defines the structure and schema for job listing data stored in the MongoDB database.
 * 
 * Schema:
 * - title: String (required) - The title of the job listing.
 * - jobType: String (required, enum) - The type of job (e.g., 'Part-time', 'Full-time').
 * - location: String (required) - The location where the job is based.
 * - salary: String (required) - The salary for the job.
 * - contact: String (required) - Contact information for the job listing.
 * - description: String (required) - A detailed description of the job.
 * - postedBy: ObjectId (optional) - References the User who posted the job listing.
 * - applicants: Array of ObjectIds (optional) - References to Users who have applied for the job listing.
 * - jobID: ObjectId (required) - Unique identifier for the job listing.
 * 
 * @typedef {Object} Job
 * @property {string} title - The title of the job listing.
 * @property {string} jobType - The type of job ('Part-time', 'Full-time').
 * @property {string} location - The location of the job.
 * @property {string} salary - The salary for the job.
 * @property {string} contact - Contact information for the job listing.
 * @property {string} description - A detailed description of the job.
 * @property {ObjectId} [postedBy] - The user who posted the job listing.
 * @property {ObjectId[]} [applicants] - Users who have applied for the job listing.
 * @property {ObjectId} jobID - Unique identifier for the job listing.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the job schema outside the exported function
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Part-time', 'Full-time', 'Contract', 'Temporary', 'Internship']
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String, // Consider using a Number for easier range queries and validation
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches your User model's name
    required: false
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: false
  }],
  // jobID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false,
  //   default: mongoose.Types.ObjectId // Automatically generate ObjectId

  //   // default: () => new mongoose.Types.ObjectId() // Automatically generate if not provided

  // }
}, { timestamps: true }); // Including timestamps to track when jobs are created or updated

// Create and export the User model
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;


// // Export a function that accepts a connection and returns a Job model bound to that connection
// module.exports = function(connection) {
//   // Use the connection argument to create and return the model
//   // This ensures that the model is associated with the specified connection, not the default connection
//   return connection.model('Job', jobSchema);
// };
