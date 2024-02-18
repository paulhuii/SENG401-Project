import React from 'react';
import './App.css';
import JobListing from "./components/jobPosting/JobListing";
import 'bootstrap/dist/css/bootstrap.min.css';


function JobBoard() {
  return (
    <div className="page-container">
      <h1 className="page-title">Relevant Jobs:</h1>
      <p/>
      <div className="content">
        <div class="card-columns" >
            <JobListing/>
            <JobListing/>
            <JobListing/>
            <JobListing/>
            <JobListing/>
        </div>
      </div>
    </div>
  );
}

export default JobBoard;
