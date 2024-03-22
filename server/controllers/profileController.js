const User = require('../models/User');
const Job = require('../models/Job');

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await User.find({username: {$regex: req.query.username}})
            .limit(10).select("name username role")

            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        console.log('Received updateUser request with data:', req.body);

        try {
            const { name, username, email, role, gender, description, profile_photo } = req.body
            if(!name) return res.status(400).json({msg: "Please add your full name."})
            console.log('Updating user ID:', req.userId);

            // Assuming you're using MongoDB with Mongoose for database operations
            const updatedUser = await User.findByIdAndUpdate(req.userId, { name, username, email, role, gender, description, profile_photo }, { new: true });

            if (!updatedUser) {
              console.log('User not found with ID:', req.userId);
              return res.status(404).json({ message: 'User not found' });
            }

            console.log('Updated user successfully:', updatedUser);
            res.json({ message: 'Update Success!', user: updatedUser });
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message})
        }
    },

    getUserProfile: async (req, res) => {
        try {
          // Assuming the user's ID is stored in req.userId after authentication
          const user = await User.findById(req.userId).select('-password'); // Exclude password
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },

    getApplicantCount: async (req, res) => {
        try {
            console.log("Here!");

            const applicantCount = await User.countDocuments({ role: 'Jobseeker' });
            res.json({ count: applicantCount });
        } catch (err) {
            console.error('Error fetching applicant count:', err);
            return res.status(500).json({ msg: 'Error fetching applicant count' });
        }
    },
    uploadProfilePhoto: async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
    
        const userId = req.userId;
    
        // Generate the absolute URL for the uploaded file
        const profilePhotoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
        try {
            const user = await User.findById(userId);
    
            if (!user) {
                // If the user does not exist
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Update the user's profile photo URL in the database
            user.profile_photo = profilePhotoUrl;
            console.log("User new profile photo: ", user.profile_photo);
            await user.save();
    
            res.json({
                message: 'Profile photo updated successfully',
                profilePhotoUrl, // Return the absolute URL where the photo can be accessed
            });
        } catch (error) {
            console.error('Error uploading profile photo:', error);
            res.status(500).json({ message: 'Internal server error while updating profile photo.' });
        }
},


    getRecruiterCount: async (req, res) => {
        try {
            console.log("Here!");

            const recruiterCount = await User.countDocuments({ role: 'Recruiter' });
            res.json({ count: recruiterCount });
        } catch (err) {
            console.error('Error fetching Recruiter count:', err);
            return res.status(500).json({ msg: 'Error fetching Recruiter count' });
        }
    },


    getApplicantList: async(req,res) => {
        try {
            // Query the database to find all users with role 'Jobseeker'
            const jobSeekers = await User.find({ role: 'Jobseeker' });

            // If no job seekers found, return an empty array
            if (!jobSeekers || jobSeekers.length === 0) {
                return res.json({ message: 'No job seekers found' });
            }

            // If job seekers found, return the list of job seekers
            res.json({ jobSeekers });
        } catch (err) {
            console.error('Error fetching job seekers:', err);
            return res.status(500).json({ msg: 'Error fetching job seekers' });
        }
    },


    getRecruiterList: async(req,res) => {
        try {
            // Query the database to find all users with role 'Jobseeker'
            const Recruiters = await User.find({ role: 'Recruiter' });

            // If no Recruiters found, return an empty array
            if (!Recruiters || Recruiters.length === 0) {
                return res.json({ message: 'No job Recruiters found' });
            }

            // If Recruiters found, return the list of Recruiters
            res.json({ Recruiters });
        } catch (err) {
            console.error('Error fetching Recruiters:', err);
            return res.status(500).json({ msg: 'Error fetching Recruiters' });
        }
    },

    getAppliedJobs: async (req, res) => {
        try {
          const userID = req.userId; // Extracted from authentication middleware
          console.log("userID: ", userID);
          const user = await User.findById(userID);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Assuming the user model has an array of job IDs the user has applied to
          const appliedJobs = await Job.find({ '_id': { $in: user.jobs } });
      
          res.json(appliedJobs);
        } catch (error) {
          console.error('Error fetching applied jobs:', error);
          res.status(500).send('Failed to fetch applied jobs');
        }
      }

};

module.exports = userCtrl

