/**
 * App Component
 *
 * This component serves as the main entry point for the JobHub application.
 * It provides routing functionality using React Router to navigate between different pages.
 * The header includes links to the Home page, Dashboard, and Login/Logout functionality.
 *
 * State Variables:
 * - isLoggedIn: Tracks the authentication status of the user.
 *
 * Functions:
 * - checkAuthToken: Checks if a token exists in local storage to determine the user's authentication status.
 * - handleLogout: Clears the authentication token and updates the isLoggedIn state when the user logs out.
 * - clearAuthToken: Removes the authentication token from local storage.
 *
 * Rendering:
 * - Displays a header with navigation links and conditionally renders Login or Logout button based on authentication status.
 * - Utilizes React Router to handle routing and rendering of different components based on the URL.
 *
 * Components:
 * - Home: Renders the home page.
 * - Login: Renders the login page and handles user authentication.
 * - Signup: Renders the signup page for user registration.
 * - Dashboard: Renders the dashboard page with user-specific content.
 * - Profile: Renders the user profile when logged in.
 *
 * CSS:
 * - Styling for the application is defined in a separate CSS file (App.css).
 *
 * @returns JSX Element
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Profile'; // Import the Profile component
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  // Function to check if a token exists in local storage
  const checkAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if token exists
    }
  };

  // Call checkAuthToken when the component mounts
  useEffect(() => {
    checkAuthToken();
  }, []);

  // Function to clear the authentication token and handle logout
  const handleLogout = () => {
    clearAuthToken(); // Clear the authentication token
    setIsLoggedIn(false); // Update the authentication status
  };

  // Function to clear the authentication token from localStorage
  const clearAuthToken = () => {
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        {/* Header for the entire application */}

        <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/BxRocket.png" alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2"/>
            <span className="fw-bold fs-4">JobHub</span>
          </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <form class="d-flex" role="search">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ maxWidth: '200px' }} />
                  <button className="btn btn-success" type="submit">Search</button>
                </form>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button className="btn btn-primary me-2" onClick={handleLogout}>{isLoggedIn ? 'Logout' : 'Login'}</button>
                  </Link>
                </li>
                {!isLoggedIn && (
                    <li className="navbar-nav ml-auto">
                      <Link to="/signup" className="nav-link">
                        <button className="btn btn-primary">Signup</button>
                      </Link>
                    </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes for different pages */}
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Pass setIsLoggedIn to Login component */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {/* Render the Profile component only when logged in */}
            {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
