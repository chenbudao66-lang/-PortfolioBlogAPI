const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Comment body is required'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment must have an author']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: [true, 'Comment must belong to a blog post']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
