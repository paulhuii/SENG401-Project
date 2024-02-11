/**
 * Login Component
 * 
 * This component provides functionality for user login.
 * 
 * @param {function} setIsLoggedIn - Function to set the authentication status
 * @returns {JSX.Element} - Login form and redirecting message
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login({ setIsLoggedIn }) {
  // State variables
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    token: ''
  });
  const [error, setError] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  // Check for token at component initialization
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setRedirecting(true); // Set redirecting to true if token exists
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500); // Delay for 1.5 seconds before redirecting
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to login. Please try again.');
      }
      const data = await response.json(); // Parse JSON response

      // Assuming the token is sent back in the response under a property named 'token'
      if (data.token) {
        localStorage.setItem('token', data.token); // Save the token to localStorage
        setIsLoggedIn(true); // Update isLoggedIn state to true
        window.location.href = '/dashboard'; // Redirect to dashboard after login
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };
  
  // Display redirecting message if redirecting
  if (redirecting) {
    return (
      <div className="login-container">
        <h1 className="login-title">Redirecting...</h1>
        <div className="redirect-message">
          You are being redirected to the dashboard because you're already logged in.
        </div>
      </div>
    );
  }

  // Render login form
  return (
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        {/* Add Link to Signup page */}
        <Link to="/signup" className="signup-link">Don't have an account? Sign up here</Link>
      </div>
    </div>
  );
}

export default Login;
