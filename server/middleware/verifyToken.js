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
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("11111111"); // Check the format and completeness

    const token = authHeader && authHeader.split(' ')[1]; // Split "Bearer <token>" and take the token part
    console.log("2222222222"); // Check the format and completeness


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized in verifyToken.js' });
    }
    console.log("JWT_SECRET:", process.env.JWT_SECRET); // Check if JWT_SECRET is correctly set
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Verification Error:", err); // Log the error details
            return res.status(401).json({ message: `Unauthorized in jwt.verify: ${err.message}` });
        }
        req.userId = decoded.userId;
        req.role = decoded.role; // Ensure your token's payload includes 'role'
        next();
    });
};

module.exports = verifyToken;
