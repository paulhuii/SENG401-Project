/**
 * Authentication Controller
 * 
 * This controller handles user registration and login.
 * 
 * @requires bcrypt
 * @requires jwt
 * @requires User
 */

// Import required modules
const bcrypt = require('bcryptjs');
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
            password: hashedPassword,
            role: req.body.role,
            name: req.body.name,
            gender: req.body.gender
        });

        await newUser.save();

        // Generate JWT token for the new user
        const token = jwt.sign(
            {
                userId: newUser._id.toString(),
                role: newUser.role // Make sure newUser.role is not undefined
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the tokenn along with the success message
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role, 
                name: newUser.name,
                gender: newUser.gender,
                description: newUser.description,
                _id: newUser._id.toString()
            },
            token: token
        });
    } catch (error) {
        console.log(error);
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
            { 
                userId: user._id.toString(),
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Include the role in the login response
        res.json({
            message: "Login successful",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                name: user.name,
                gender: user.gender,
                description: user.description,
                _id: user._id.toString(),
            },
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
