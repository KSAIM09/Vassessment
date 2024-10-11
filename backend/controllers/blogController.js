const BlogPost = require('../models/BlogPost');

// Create a new blog post
const createBlogPost = async (req, res) => {
  const { title, content, location } = req.body;
  
  if (!title || !content || !location) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newPost = await BlogPost.create({
      user: req.user._id, // Assuming `req.user` contains the logged-in user info from middleware
      title,
      content,
      location,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('user', 'name email'); // Optionally populate user info
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('user', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post', error });
  }
};

// Update a blog post (only by the post's owner)
const updateBlogPost = async (req, res) => {
  const { title, content, location } = req.body;

  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the post owner
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.location = location || post.location;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error });
  }
};

// Delete a blog post (only by the post's owner)
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the post owner
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await post.remove();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
