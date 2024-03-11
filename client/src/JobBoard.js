import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "./components/jobPosting/JobListing";
import { Button } from 'react-bootstrap';
import "./JobBoard.css"
// import React from 'react';
import { useState } from 'react';

function JobBoard() {

  var queryCounter = 0;

  // TODO: An example of how data should be formatted in the array. Once backend is connected, you can make this empty and update it when required.
  const[jobListingArray, updateJobListings] = useState([
    {position:'Data Scientist', company:'Netflix', location:'Seattle, WA', description:"A data scientist is a professional who utilizes their expertise in statistics, mathematics, programming, and domain knowledge to analyze and interpret complex data sets. They employ various techniques, algorithms, and machine learning models to extract insights, patterns, and trends from data, which can be used to inform business decisions, solve problems, or drive innovation."},
    {position:'Software Engineer I', company:'Facebook', location:'Seattle, WA', description:""},
    {},
    {}])

    // TODO: A function that updates the list of job listings from the database
    const fetchJobListings = () =>{
      try {
        // Get job listings from database that match query. My suggestion is to load a max of 25 job listings then have a "Next" button at the end of the list that will query the db again for the next 25
        // updateJobListings([an array containing jobListings as formatted above])
      } catch (err) {
        console.log(err);
      }
    }
  
    // Once a user enters the room, load the first 25
    window.addEventListener("load", function(){
      updateJobListings()
      fetchJobListings();

      queryCounter++;
    })
  
  return (
    <div className='jbpage'>
      <div className="jbpage-container">
        <h1 className="page-title">Available Jobs:</h1>
        {/* <Button type="button" class="btn btn-dark" id="filter"> Test Filter </Button> */}
        <p/>
        <div className="content">
          <div class="card-columns" overflow-y="auto">
            {jobListingArray.map(jobInfo => (
            <JobListing position={jobInfo.position} company={jobInfo.company} location={jobInfo.location} description={jobInfo.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
