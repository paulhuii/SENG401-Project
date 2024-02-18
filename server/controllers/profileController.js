const User = require('../models/User');

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({username: {$regex: req.query.username}})
            .limit(10).select("name username role")
            
            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        console.log('Received updateUser request with data:', req.body);

        try {
            const { name, username, email, role, gender } = req.body
            if(!name) return res.status(400).json({msg: "Please add your full name."})
            console.log('Updating user ID:', req.userId);

            // Assuming you're using MongoDB with Mongoose for database operations
            const updatedUser = await User.findByIdAndUpdate(req.userId, { name, username, email, role, gender }, { new: true });
      
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
}


module.exports = userCtrl