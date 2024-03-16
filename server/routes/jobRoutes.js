const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary
const { authorizeRole } = require('../middleware/authorizeRole'); // Adjust path as needed
const jobsController = require('../controllers/jobsController'); // Adjust path as needed

const router = express.Router();

// Protect routes
router.post('/', (req, res, next) => {
    console.log('Request received for job creation');
    next();
  }, verifyToken, authorizeRole('Recruiter'), jobsController.create);


  router.get('/list', verifyToken, authorizeRole('Recruiter'), jobsController.list);

// Allow access to job count without token verification
router.get('/count', jobsController.count);

module.exports = router;
