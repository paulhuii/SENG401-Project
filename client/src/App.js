import React from 'react';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Dashboard from './dashboard'; // Make sure to import Dashboard
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header for the entire application */}
        <header className="App-header">
          <p>JobHub</p>
          <nav>
            <Link to="/">Home</Link>{' '}
            <Link to="/signup">Signup</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Utilize the Dashboard component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
