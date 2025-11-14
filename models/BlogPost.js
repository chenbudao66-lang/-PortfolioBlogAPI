const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog post content is required']
  },
  excerpt: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Blog post must have an author']
  },
  tags: {
    type: [String],
    default: []
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
