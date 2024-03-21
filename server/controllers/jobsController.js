
const Job = require('../models/Job');
const User = require('../models/User');

// Function to list all jobs
exports.list = async (req, res) => {
  
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find({});
    console.log(jobs)

    // Send the jobs back in the response
    res.status(200).json(jobs);
  } catch (error) {
    // Log and send back error message if something goes wrong
    console.error('Error fetching job listings:', error);
    res.status(500).send('Failed to fetch job listings');
  }
};

//Function to create jobs - recruiter only
exports.create = async (req, res) => {
    try {
      console.log("Received request body:", req.body); // Log the received request body

      const { title, jobType, location, salary, contact, description } = req.body;
      
      // Log the destructured values to ensure they're what we expect
      console.log("Destructured data:", { title, jobType, location, salary, contact, description });
      console.log("Description content:", description);


      // Create a new job document in the database
      const newJob = await Job.create({
        title,
        jobType,
        location,
        salary,
        contact,
        description,
        // postedBy: req.user._id // Assumes req.user is populated by the auth middleware
      });

      console.log("New job created:", newJob); // Log the created job document

      // Send back the created job document as a response
      res.status(201).json(newJob);
    } catch (error) {
      // Log the error if the try block fails
      console.error("Failed to create job:", error.message);

      // Handle any errors that occur during the job creation process
      res.status(400).json({ message: 'Failed to create job', error: error.message });
    }
};


// function to count the number of jobs in the database
exports.count = async (req, res) => {

  try {
    // Count the number of jobs in the database
    const count = await Job.countDocuments();
    // Send the count back in the response
    res.status(200).json({ count });
  } catch (error) {
    // Log and send back error message if something goes wrong
    console.error('Error counting jobs:', error);
    res.status(500).send('Failed to count jobs');
  }
};

exports.deleteJob = async (req, res) => {
  try {
    // Extract the job ID from the request parameters
    const { jobId } = req.params;

    // Use the Job model to find and remove the job by its ID
    const deletedJob = await Job.findByIdAndDelete(jobId);

    // Check if the job was found and deleted successfully
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Send a success message back in the response
    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    // Log and send back error message if something goes wrong
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Failed to delete job', error: error.message });
  }
};

exports.applyToJob = async (req, res) => {
  const { jobID } = req.params; 

  console.log("jobID, ", jobID);
  const userID = req.userId; // Extracted from authentication middleware
  console.log("userID ", userID);

  try {
    // Add the user's _id to the Job's applicants array
    const jobUpdate = await Job.findByIdAndUpdate(jobID, {
      $push: { applicants: userID }
    }, { new: true });

    // Optionally, add the job's _id to the User's jobs array
    const userUpdate = await User.findByIdAndUpdate(userID, {
      $push: { jobs: jobID }
    }, { new: true });

    if (!jobUpdate || !userUpdate) {
      return res.status(404).send('Job or User not found');
    }

    res.status(200).json({ message: 'Application successful', jobUpdate, userUpdate });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller for getting applicants for a job
exports.getApplicantsForJob = async (req, res) => {
  const { jobID } = req.params;

  try {
    const jobWithApplicants = await Job.findById(jobID).populate('applicants');
    if (!jobWithApplicants) {
      return res.status(404).send('Job not found');
    }

    res.json(jobWithApplicants.applicants);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


