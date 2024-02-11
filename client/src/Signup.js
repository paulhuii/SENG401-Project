import React, { useState, useEffect } from 'react';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    token: ''
  });

  const [error, setError] = useState('');
  const [redirecting, setRedirecting] = useState(false); // State to track redirecting status

  // Check for token at component initialization
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setRedirecting(true); // Set redirecting to true
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500); // Delay for 2 seconds before redirecting
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }
      const data = await response.json(); // Parse JSON response
      // Print the parsed JSON response to the console
      console.log('Response data:', data);

      // Assuming the token is sent back in the response under a property named 'token'
      if (data.token) {
        localStorage.setItem('token', data.token); // Save the token to localStorage
        window.location.href = '/dashboard'; // Redirect to dashboard after signup
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };
  
  if (redirecting) {
    // Display redirecting message
    return (
      <div className="signup-container">
        <h1 className="signup-title">Redirecting...</h1>
        <div className="redirect-message">
          You are being redirected to the dashboard because you're already logged in.
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup Page</h1>
      <div className="signup-content">
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
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
          <button type="submit">Signup</button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
