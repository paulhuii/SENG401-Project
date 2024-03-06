import React, { useState } from 'react';
import axios from 'axios';
import JobApplicationPopup from './JobApplicationPopup'; // Import the popup component
import './JobListing.css';

const JobListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post('/api/jobs', { title, description });
      setShowPopup(true); // Show popup on successful job posting
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  return (
    <div className="row-lg-4 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body">
          <h3 className="card-title">Job Position</h3>
          <h5>Company | <span className="text-muted">Location</span> </h5>
          <div className="description">
            <p className="card-text">
              {/* Your job description */}
            </p>
          </div>
          <button className="btn btn-primary p-2" onClick={handleSubmit} type="button">Apply</button>
          <span className="p-2 text-secondary"> Posted _ Days Ago</span>
          {showPopup && <JobApplicationPopup />} {/* Show popup when showPopup state is true */}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
