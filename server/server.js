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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use the authentication routes
app.use('/api', authRoutes);
app.use('/api', userRoutes); // Use user routes
// app.put('/api/profile', (req, res) => {
//   console.log('Hello');
//   res.status(200).json({ message: 'Profile endpoint hit successfully' });
// });


// Start the server
const PORT = process.env.PORT || 5000; // Default port is 5000 if not specified in environment
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
