import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import BlogCard from '../components/Blog/BlogCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs'); // API call to fetch blog data
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Blog App</h1>
        <div>
          <Link to="/login" className="mr-4 text-blue-600 font-semibold">Login</Link>
          <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to the Blog Platform</h2>
          <p className="text-lg mb-6">Discover blogs from around the world based on your location!</p>
          <Link to="/create" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
            Create Your Blog
          </Link>
        </div>
      </header>

      {/* Blog Feed */}
      <section className="container mx-auto py-8 px-4">
        <h3 className="text-2xl font-semibold mb-6">Latest Blogs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.length ? (
            blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <p className="text-gray-600">No blogs available. Be the first to create one!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
