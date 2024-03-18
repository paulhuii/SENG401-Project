// Function to list all jobs
exports.list = async (req, res) => {
  // Accessing the Job model from app.locals
  const Job = req.app.locals.Job;
  
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();



    // Send the jobs back in the response
    res.status(200).json(jobs);
  } catch (error) {
    // Log and send back error message if something goes wrong
    console.error('Error fetching job listings:', error);
    res.status(500).send('Failed to fetch job listings');
  }
};

exports.create = async (req, res) => {
    // Access the Job model directly from app.locals
    const Job = req.app.locals.Job;
  
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
  // Accessing the Job model from app.locals
  const Job = req.app.locals.Job;

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


