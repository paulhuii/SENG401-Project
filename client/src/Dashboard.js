// dashboard.js

import React, { useState } from 'react';
import './Dashboard.css';
import JobListing from "./components/jobPosting/JobListing";
import CompanyCard from "./components/Cards/CompanyCard";
import ApplicationCard from "./components/Cards/ApplicationCard";


function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('My Network');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Your Dashboard</h1>
      
      <div className="content">
        <p>Welcome to the dashboard page!</p>
        {/* Add more content here */}
        <div className="divider">
          <div className="menu">  
            <div className={`menu-item ${selectedMenuItem === 'My Network' ? 'active' : ''}`} onClick={() => handleMenuItemClick('My Network')}>My Network</div>
            <div className={`menu-item ${selectedMenuItem === 'Browse Available Jobs' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Browse Available Jobs')}>Browse Available Jobs</div>
            <div className={`menu-item ${selectedMenuItem === 'My Applications' ? 'active' : ''}`} onClick={() => handleMenuItemClick('My Applications')}>My Applications</div>
          </div>

          <div className="menu-content">
            {selectedMenuItem === 'My Network' && 
            <div className="content-item-db">
              <div className='card-columns companies'> 
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
                {/* <div className="card-db" id='dashboard-card'>
                  <div className="card-body recruiter">
                    <h5 className="card-title-db">Company Name</h5>
                    <p className="card-text-db">Location</p>
                    <p className="card-text-db">Email:</p>
                  </div>
                </div> */}
          
              </div>

            </div>}
            {selectedMenuItem === 'Browse Available Jobs' && 
            <div className="content-item-db">
              <div className="card-columns job-listing">
                <JobListing />
                <JobListing />
                <JobListing />
                <JobListing />
              </div>

            </div>}
            {selectedMenuItem === 'My Applications' && 
            <div className="content-item-db">
              <div className='card-columns applications'> 
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                {/* <div className="card-db" id='dashboard-card'>
                  <div className="card-body applied-job">
                    <h5 className="card-title-db">Job Title</h5>
                    <p className="card-text-db">Company Name</p>
                    <p className="card-text-db">Location</p>
                    <p className="card-text-db">Date Applied: 2021-01-01</p>
                  </div>
                </div> */}
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
