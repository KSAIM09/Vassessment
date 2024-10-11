const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all blogs based on geo-location (this is a simplified version)
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Adjust based on location detection logic
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
