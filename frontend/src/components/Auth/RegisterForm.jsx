import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For displaying error messages
  const navigate = useNavigate(); // For redirection after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axiosInstance.post('users/register', { name, email, password });
      alert('Registration successful!');

      // Optional: Automatically log in after successful registration if token is returned
      if (response.data.token) {
        // Assume login function from context is available (if you choose to auto-login)
        // login(response.data.token);
      }
      
      navigate('/login'); // Redirect to login page
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed!';
      setError(errorMessage); // Set error message
      console.error('Registration error:', err); // Log the error for debugging
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
