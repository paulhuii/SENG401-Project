const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Handle new user registration
exports.register = async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token for the new user
        const token = jwt.sign(
            { userId: newUser._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token along with the success message
        res.status(201).json({
            message: 'User registered successfully',
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle user login
exports.login = async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
