/**
 * Authentication Routes
 * 
 * This file defines routes for user authentication.
 * 
 * @requires express
 * @requires profileControllerController
 */


const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/profileController");
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary

router.get('/search', verifyToken, userCtrl.searchUser);

router.put('/profile', verifyToken, userCtrl.updateUser);

module.exports = router;
