const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Require CORS
const app = express();
require('dotenv').config({ path: '../.env' });

// Use CORS
app.use(cors());

// Replace the following with your MongoDB connection string
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
