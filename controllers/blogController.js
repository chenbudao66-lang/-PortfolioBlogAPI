const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

/**
 * @route   GET /api/blog
 * @desc    Get all blog posts
 * @access  Public
 */
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/blog/:id
 * @desc    Get single blog post by ID with comments
 * @access  Public
 */
const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Get comments for this post
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        comments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   POST /api/blog
 * @desc    Create a new blog post
 * @access  Private
 */
const createBlogPost = async (req, res) => {
  try {
    const { title, content, excerpt, tags } = req.body;

    const post = await BlogPost.create({
      title,
      content,
      excerpt,
      tags,
      author: req.user._id
    });

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username email');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   PUT /api/blog/:id
 * @desc    Update a blog post
 * @access  Private (Author only)
 */
const updateBlogPost = async (req, res) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog post'
      });
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('author', 'username email');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   DELETE /api/blog/:id
 * @desc    Delete a blog post
 * @access  Private (Author only)
 */
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog post'
      });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Blog post and associated comments deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   GET /api/blog/:postId/comments
 * @desc    Get all comments for a blog post
 * @access  Public
 */
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @route   POST /api/blog/:postId/comments
 * @desc    Create a comment on a blog post
 * @access  Private
 */
const createComment = async (req, res) => {
  try {
    const { body } = req.body;

    // Check if blog post exists
    const post = await BlogPost.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getComments,
  createComment
};
