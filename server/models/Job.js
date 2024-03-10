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
 * - postedBy: ObjectId (required) - References the User who posted the job listing.
 * 
 * @typedef {Object} Job
 * @property {string} title - The title of the job listing.
 * @property {string} jobType - The type of job ('Part-time', 'Full-time').
 * @property {string} location - The location of the job.
 * @property {string} salary - The salary for the job.
 * @property {string} contact - Contact information for the job listing.
 * @property {string} description - A detailed description of the job.
 * @property {ObjectId} postedBy - The user who posted the job listing.
 */

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Part-time', 'Full-time', 'Contract', 'Temporary', 'Internship'] // Adjust based on your application's needs
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String, // Consider using a Number or a structured object if you need to store ranges or additional details
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
    required: true
  },
}, { timestamps: true }); // Including timestamps to track when jobs are created or updated

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
