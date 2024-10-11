const express = require('express');
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getAllBlogPosts); // Fetch all blog posts
router.get('/:id', getBlogPostById); // Fetch a specific post by ID

// Protected Routes (for authenticated users)
router.post('/', protect, createBlogPost); // Create a new blog post
router.put('/:id', protect, updateBlogPost); // Update a blog post
router.delete('/:id', protect, deleteBlogPost); // Delete a blog post

module.exports = router;
