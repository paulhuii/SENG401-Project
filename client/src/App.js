import React from 'react';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard'; // Correct import for Dashboard
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header for the entire application */}
        <header className="App-header">
          <h1 className="app-title">JobHub</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </nav>
        </header>
        
        {/* Routes for different pages */}
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
