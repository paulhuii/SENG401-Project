/**
 * Signup Component
 * 
 * This component provides a form for user registration.
 * Users can input their email, name, username, password, and role (recruiter or job seeker).
 * Upon successful registration, users are redirected to the dashboard.
 * 
 * State Variables:
 * - formData: Stores form data including email, name, username, password, and role.
 * - error: Stores error messages.
 * - redirecting: Tracks whether the user is being redirected to the dashboard.
 * 
 * Effects:
 * - useEffect: Checks for an existing token in local storage to determine if the user is already logged in.
 * 
 * Event Handlers:
 * - handleChange: Updates the formData state when input values change.
 * - handleSubmit: Handles form submission, sending a POST request to the server with form data.
 * 
 * Rendering:
 * - Displays a signup form with input fields for user information.
 * - Provides feedback on successful registration or displays errors if registration fails.
 * 
 * CSS:
 * - Styling for the signup form is defined in a separate CSS file (Signup.css).
 * 
 * @returns JSX Element
 */


import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    role: '',
    gender: ''
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
      }, 1500); // Delay for 1.5 seconds before redirecting
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
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }
      const data = await response.json(); // Parse JSON response
      // Print the parsed JSON response to the console
      console.log('Response data:', data);

      // Assuming the token is sent back in the response under a property named 'token'
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Save user data to localStorage
        localStorage.setItem('userId', data.user._id);

        window.location.href = '/';
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
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Jobseeker">Job Seeker</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>

            </select>
          </div>
          <Button type="submit">Signup</Button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
