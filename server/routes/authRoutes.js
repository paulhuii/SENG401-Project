/**
 * Authentication Routes
 * 
 * This file defines routes for user authentication.
 * 
 * @requires express
 * @requires authController
 */

// Import required modules
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the controllers
// Signup route
router.post('/signup', authController.register);

// Login route
router.post('/login', authController.login);

module.exports = router;
