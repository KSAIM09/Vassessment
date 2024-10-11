import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{blog.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{blog.excerpt}</p>
        <p className="text-blue-600 text-sm mt-2">Location: {blog.location}</p>
        <div className="mt-4">
          <a href={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
