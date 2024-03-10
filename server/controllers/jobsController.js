// Since Job model is attached to app.locals, no need to require it at the top

exports.create = async (req, res) => {
    // Access the Job model directly from app.locals
    const Job = req.app.locals.Job;
  
    try {
      const { title, jobType, location, salary, contact, description } = req.body;
      // Create a new job document in the database
      const newJob = await Job.create({
        title,
        jobType,
        location,
        salary,
        contact,
        description,
        postedBy: req.user._id // Assumes req.user is populated by the auth middleware
      });
      // Send back the created job document as a response
      res.status(201).json(newJob);
    } catch (error) {
      // Handle any errors that occur during the job creation process
      res.status(400).json({ message: 'Failed to create job', error: error.message });
    }
  };
  