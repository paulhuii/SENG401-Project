/**
 * Express Server Setup
 *
 * This file sets up an Express server with middleware, routes, and MongoDB connection.
 *
 * @requires express
 * @requires mongoose
 * @requires cors
 * @requires authRoutes
 * @requires dotenv
 */

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const jobRoutes = require('./routes/jobRoutes')

require('dotenv').config({ path: '../.env' });

// Create an Express application
const app = express();

// Configure middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming request bodies as JSON

// Middleware to log each incoming request
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next(); // Call the next middleware in the chain
});

// Connect to MongoDB

mongoose.connect(process.env.MONGO, {
}).then(() => console.log('Universal connection to MongoDB established'))
    .catch(err => console.error('Connection error:', err));


const db = mongoose.createConnection(process.env.MONGO);

//Catch connection error for db
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB db');
});

const createJobModel = require('./models/Job');
const Job = createJobModel(db); // Now Job is a model that uses the db connection
app.locals.Job = Job; // Attach the Job model to the app object


// Use the authentication routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/jobs', jobRoutes);

// Start the server
const PORT = process.env.PORT || 5000; // Default port is 5000 if not specified in environment
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
