import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "./components/jobPosting/JobListing";
import { Button } from 'react-bootstrap';
import "./JobBoard.css"

function JobBoard() {
  
  return (
    <div className="jbpage-container">
      <h1 className="page-title">Available Jobs:</h1>
      {/* <Button type="button" class="btn btn-dark" id="filter"> Test Filter </Button> */}
      <p/>
      <div className="content">
        <div class="card-columns" >
            <JobListing position="Junior Software Engineer" company="Amazon" location="Vancouver, BC" 
              description="20+ Years of experience doing AI and ML"/>
            <JobListing/>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
