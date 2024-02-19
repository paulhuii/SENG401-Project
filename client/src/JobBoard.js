import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "./components/jobPosting/JobListing";


function JobBoard() {
  return (
    <div className="page-container">
      <h1 className="page-title">Relevant Jobs:</h1>
      <p/>
      <div className="content">
        <div class="card-columns" >
             {/* How to pass in Job Listings for the time being until backend can get this from Job Posting*/}
            <JobListing position="Junior Software Engineer" company="Amazon" location="Vancouver, BC" description="20+ Years of experience doing AI and ML"/>
            <JobListing/>
        </div>
      </div>
    </div>
  );
}

export default JobBoard;
