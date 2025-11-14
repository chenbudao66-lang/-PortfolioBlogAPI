const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect middleware - Verify JWT token and attach user to request
 */
const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

/**
 * Check if the requesting user is the author of the resource
 */
const checkAuthor = (resource) => {
  return (req, res, next) => {
    // resource.author or resource.user should match req.user._id
    const authorId = resource.author ? resource.author.toString() : resource.user.toString();

    if (authorId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to perform this action'
      });
    }

    next();
  };
};

module.exports = { protect, checkAuthor };
