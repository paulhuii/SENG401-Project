// Adjusted authorizeRole to use roles and permissions (conceptual explanation)
const { roles } = require('../roles');

const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.userRole; // The role should be attached to req by verifyToken middleware
    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized: No role provided" });
    }

    // Direct role check (ignoring specific permissions for this explanation)
    if (!roles[userRole] || userRole !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Insufficient role privileges" });
    }

    next();
  };
};

module.exports = { authorizeRole };
