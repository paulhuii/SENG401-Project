const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary
const { authorizeRole } = require('../middleware/authorizeRole'); // Adjust path as needed
const jobsController = require('../controllers/jobsController'); // Adjust path as needed

const router = express.Router();

// Protect routes
router.post('/', (req, res, next) => {
    console.log('Request received for job creation');
    next();
  }, verifyToken, authorizeRole('recruiter'), jobsController.create);


  router.get('/list', verifyToken, authorizeRole('recruiter'), jobsController.list);
  
module.exports = router;
