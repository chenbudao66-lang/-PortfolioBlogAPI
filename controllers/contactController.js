const Message = require('../models/Message');

/**
 * @route   POST /api/contact
 * @desc    Submit a contact form message
 * @access  Public
 */
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create message
    const contactMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: contactMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (Admin only)
 * @access  Private
 */
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitContactForm,
  getMessages
};
