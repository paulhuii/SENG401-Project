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
const multer = require('multer');
const path = require('path');

// Corrected and more robust storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Make sure the directory exists and is correctly referenced
    },
    filename: function(req, file, cb) {
        // Corrected Date instantiation and replaced toISOString which could have characters not valid for filenames on all systems
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the original file extension
    }
});

const upload = multer({ storage: storage });


router.get('/search', verifyToken, userCtrl.searchUser);

router.put('/profile', verifyToken, userCtrl.updateUser);

router.get('/profile/info', verifyToken, userCtrl.getUserProfile);

// Route to fetch user count
router.get('/applicantCount', userCtrl.getApplicantCount);

// Route to upload photo
router.post('/profile/photo', verifyToken, upload.single('profilePhoto'), userCtrl.uploadProfilePhoto);

// Route to fetch recruiter list
router.get('/recruiterCount', userCtrl.getRecruiterCount);

// Route to fetch applicant list
router.get('/getApplicantList', userCtrl.getApplicantList);

// Route to fetch applicant list
router.get('/getRecruiterList', userCtrl.getRecruiterList);

//Route to view applied jobs
//View applied jobs for Job seeker
router.get('/appliedJobs', verifyToken, userCtrl.getAppliedJobs);

module.exports = router;
