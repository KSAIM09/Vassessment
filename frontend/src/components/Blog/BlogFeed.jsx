
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import BlogCard from './BlogCard';
import { useAuthContext } from '../../context/AuthContext'; // Assuming you have this context

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const { token } = useAuthContext(); // Retrieve the token from context or local storage

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/blogs', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Handle unauthorized access, e.g., redirect to login
        if (error.response && error.response.status === 401) {
          // Redirect to login or show an error message
        }
      }
    };

    fetchBlogs();
  }, [token]); // Include token as a dependency

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blogs in Your Location</h1>
      {blogs.length === 0 ? (
        <p className="text-lg text-gray-500">No blogs available for your location.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      )}
    </div>
  );
};

export default BlogFeed;
