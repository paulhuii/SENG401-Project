import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "./components/jobPosting/JobListing.js";
import "./JobBoard.css"
import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';

function JobBoard() {

  // const { query = ''} = useParams();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const query = params.get('query');
  const category = params.get('category');

  // Intended use: multiply by 25 to get which jobs from DB to put into jobListingArray
  // 0-24, 25-49, etc.
  var queryCounter = 0;

  // TODO: An example of how data should be formatted in the array. Once backend is connected, you can make this empty and update it when required.
  const[jobListingArray, updateJobListings] = useState([
    // {title:'Data Scientist II', company:'Netflix', location:'Seattle, WA', contact:"netflix@gmail.com", description:"A data scientist is a professional who utilizes their expertise in statistics, mathematics, programming, and domain knowledge to analyze and interpret complex data sets. They employ various techniques, algorithms, and machine learning models to extract insights, patterns, and trends from data, which can be used to inform business decisions, solve problems, or drive innovation."},
    // {title:'Data Scientist', company:'Netflix', location:'Seattle, WA', contact:"netflix@gmail.com", description:"A data scientist is a professional who utilizes their expertise in statistics, mathematics, programming, and domain knowledge to analyze and interpret complex data sets. They employ various techniques, algorithms, and machine learning models to extract insights, patterns, and trends from data, which can be used to inform business decisions, solve problems, or drive innovation."},
    // {title:'Software Engineer I', company:'Google', location:'Seattle, WA', contact:"google@gmail.com", description:""},
    // {title:'Software Engineer II', company:'Google', location:'Seattle, WA', contact:"google@gmail.com", description:""},
    // {title:'Software Engineer I', company:'Facebook', location:'Seattle, WA', contact:"facebook@gmail.com", description:""},
    // {title:'Software Engineer II', company:'Facebook', location:'Seattle, WA', contact:"facebook@fb.com", description:""},
    // {title:'Software Engineer III', company:'Facebook', location:'Seattle, WA', contact:"software3@email.com", description:""},
    // {title:'LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT ',
    // company: 'LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT ',
    // location:'LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST LIMIT TEST '}
  ]);

  const filteredJobs = jobListingArray.filter(job => job.title.toLowerCase().includes(query.toLowerCase()) 
            || job.location.toLowerCase().includes(query.toLowerCase())
            || job.description.toLowerCase().includes(query.toLowerCase()) 
            || job.jobType.toLowerCase().includes(query.toLowerCase()));


  // TODO: A function that updates the list of job listings from the database
  // You should only fetch jobs that the applicant has not applied to
  // const fetchJobListings = () =>{
  //   try {
  //     // Get job listings from database that match query. My suggestion is to load a max of 25 job listings then have a "Next" button at the end of the list that will query the db again for the next 25
  //     // updateJobListings([an array containing jobListings as formatted above])
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    const fetchJobListings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/jobs/getList',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Overall response:", response); // Prints the response status code
    
            if (!response.ok) throw new Error('Hello Failed to fetch job listings');
            const data = await response.json();
            console.log("Fetched job listings:", data); // Check fetched data
            updateJobListings(data);
        } catch (error) {
            console.error("Error fetching job listings:", error);
        }
    };

      fetchJobListings();
    }, []);


  // Once a user enters the room, load the first 25 queries
  // window.addEventListener("load", function(){
  //   fetchJobListings();
  //   queryCounter++;
  // })
  
  return (
    <div className='jbpage'>
      <div className="jbpage-container">
        {filteredJobs.length > 0 && <h1 className="page-title">Available Jobs for "{query}":</h1>}
        {/* <Button type="button" class="btn btn-dark" id="filter"> Test Filter </Button> */}
        <p/>
        <div className="content">
          <div class="card-columns" overflow-y="auto">
            {filteredJobs.length === 0 && <h1>No match found for "{query}"</h1>}
            {filteredJobs.map(jobInfo => (
              <JobListing 
                position={jobInfo.title} 
                company={jobInfo.company} 
                location={jobInfo.location} 
                description={jobInfo.description} 
                email={jobInfo.contact}
                salary={jobInfo.salary}
                jobType={jobInfo.jobType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
