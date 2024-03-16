const User = require('../models/User');

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
            const { name, username, email, role, gender, description } = req.body
            if(!name) return res.status(400).json({msg: "Please add your full name."})
            console.log('Updating user ID:', req.userId);

            // Assuming you're using MongoDB with Mongoose for database operations
            const updatedUser = await User.findByIdAndUpdate(req.userId, { name, username, email, role, gender, description }, { new: true });

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

    getApplicantCount: async (req, res) => {
        try {
            console.log("Here!");

            const applicantCount = await User.countDocuments({ role: 'Jobseeker' });
            res.json({ count: applicantCount });
        } catch (err) {
            console.error('Error fetching applicant count:', err);
            return res.status(500).json({ msg: 'Error fetching applicant count' });
        }
    }
};


module.exports = userCtrl

