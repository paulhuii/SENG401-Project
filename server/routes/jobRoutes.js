const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary
const { authorizeRole } = require('../middleware/authorizeRole'); // Adjust path as needed
const jobsController = require('../controllers/jobsController'); // Adjust path as needed

const router = express.Router();

// Protect routes to make sure only recruiter get to view the jobs they posted when logged in as a recruiter
router.post('/', (req, res, next) => {
    console.log('Request received for job creation');
    next();
  }, verifyToken, authorizeRole('Recruiter'), jobsController.create);


router.get('/list', verifyToken, authorizeRole('Recruiter'), jobsController.list);

// Allow access to job count without token verification
router.get('/count', jobsController.count);

// Allow access to job list without token verification
router.get('/getList', jobsController.list);

//Apply to job - Job seeker
router.post('/apply/:jobID', verifyToken, jobsController.applyToJob);

//View applicants for a job
router.get('/:jobID/applicants', verifyToken, authorizeRole('Recruiter'), jobsController.getApplicantsForJob);

// allow access to delete jobs
router.delete('/deleteJob/:jobId', verifyToken, authorizeRole('Recruiter'), jobsController.deleteJob);

//Apply to job - Job seeker
router.post('/apply/:jobID', verifyToken, jobsController.applyToJob);


module.exports = router;
