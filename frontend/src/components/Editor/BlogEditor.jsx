import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = () => {
    const newBlog = { title, content, location: 'user-location-based' };
  
    axiosInstance.post('/blogs', newBlog)
      .then((response) => {
        alert('Blog published successfully');
      })
      .catch((error) => {
        console.error('Error publishing blog:', error);
        alert('Failed to publish blog');
      });
  };
  

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <input
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md"
        placeholder="Write your blog content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        onClick={handlePublish}
      >
        Publish
      </button>
    </div>
  );
};

export default BlogEditor;
