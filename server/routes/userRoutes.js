/**
 * Authentication Routes
 * 
 * This file defines routes for user authentication.
 * 
 * @requires express
 * @requires profileControllerController
 */


// Adjust the path as necessary
const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/profileController");
const verifyToken = require('../middleware/verifyToken');


router.get('/search', verifyToken, userCtrl.searchUser);

router.put('/profile', verifyToken, userCtrl.updateUser);

// Route to fetch user count
router.get('/applicantCount', userCtrl.getApplicantCount);

module.exports = router;
