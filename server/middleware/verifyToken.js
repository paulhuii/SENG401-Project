/**
 * Verify Token Middleware
 * 
 * This middleware is used to verify the authenticity of JWT tokens sent with HTTP requests.
 * It checks the token included in the request headers and verifies it using the JWT secret.
 * If the token is valid, it decodes the user ID and attaches it to the request object for further processing.
 * 
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function in the middleware chain.
 * 
 * @returns {void}
 * 
 * @typedef {Object} DecodedToken
 * @property {string} userId - The decoded user ID extracted from the token.
 * 
 * @callback VerifyToken
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next function in the middleware chain.
 * 
 * @returns {void}
 */

// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Split "Bearer <token>" and take the token part

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded.userId ", decoded.userId);
        // Query the database for the user to get the role
        const user = await User.findById(decoded.userId).select('role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user ID and role to the request object

        req.userId = decoded.userId;
        console.log("User.role ", user.role);
        req.userRole = user.role; // Now you have the user's role available in your request handling

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token has expired.' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        } else {
            // Log the error and return a generic 500 (Internal Server Error) status
            console.error('Error verifying token:', err);
            return res.status(500).json({ message: 'Internal server error during token verification.' });
        }
    }
};

module.exports = verifyToken;
