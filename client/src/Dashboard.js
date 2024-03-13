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


                
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
