const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
