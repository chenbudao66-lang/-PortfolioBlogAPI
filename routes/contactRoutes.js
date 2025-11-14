const express = require('express');
const router = express.Router();
const { submitContactForm, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route - submit contact form
router.post('/', submitContactForm);

// Protected route - get all messages (admin only)
router.get('/', protect, getMessages);

module.exports = router;
