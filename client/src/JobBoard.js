import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobListing from "./components/jobPosting/JobListing.js";
import "./JobBoard.css"
import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

function JobBoard() {
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const query = params.get('query');
  const category = params.get('category');
  const[jobListingArray, updateJobListings] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const itemsPerPage = 5; // Number of job listings to display per page
  const user = JSON.parse(localStorage.getItem('user'));
  
  // handling pagination
  const handleSearchPageClick = (pageNumber) => {
    setSearchPage(pageNumber);
  };

  const handleSearchPreviousClick = () => {
    if (searchPage > 1) {
      setSearchPage(searchPage - 1);
    }
  };
  
  const handleSearchNextClick = () => {
    if (searchPage < totalSearchPages) {
      setSearchPage(searchPage + 1);
    }
  };

  // filtering job listings
  const filteredJobs = query === "" ? jobListingArray :
          jobListingArray.filter(job => 
            job.title.toLowerCase().includes(query.toLowerCase()) 
            || job.location.toLowerCase().includes(query.toLowerCase())
            || job.description.toLowerCase().includes(query.toLowerCase()) 
            || job.jobType.toLowerCase().includes(query.toLowerCase()));

  const totalSearchPages = Math.ceil(filteredJobs.length / itemsPerPage); // Total number of pages of search results

  const currentFilteredJobs = filteredJobs.slice((searchPage - 1) * itemsPerPage, searchPage * itemsPerPage); // Job listings to display on the current page
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

  
  return (
    <div className='jbpage'>
      <div className="jbpage-container">
        {filteredJobs.length > 0 && <h1 className="page-title">{query === "" ? "Available Jobs: ":'Available Jobs for "' + query + '"'}</h1>}
        <p/>
        <div className="content">
          <div className="card-columns" overflow-y="auto">
            {filteredJobs.length === 0 && query!== "" && <h1>No match found for "{query}"</h1>}
            <p style={{fontSize: '0.8em'}}>Total search results: {filteredJobs.length}</p>
            {currentFilteredJobs.map(jobInfo => (
              <JobListing 
                key = {jobInfo._id}
                jobID = {jobInfo._id}
                position={jobInfo.title} 
                company={jobInfo.company} 
                location={jobInfo.location} 
                description={jobInfo.description} 
                email={jobInfo.contact}
                salary={jobInfo.salary}
                jobType={jobInfo.jobType}
                applied={user ? (jobInfo['applicants'].indexOf(user['_id']) !== -1? true : false) : false}
              />
            ))}
          </div>
          <div className="pagination">
                <div className="pagination-button-placeholder">
                  {searchPage > 1 && (
                    <button className="pagination-button prev-next-button" onClick={handleSearchPreviousClick}>
                      Previous
                    </button>
                  )}
                </div>
                {[...Array(totalSearchPages)].map((_, index) => (
                  <button 
                    className={`pagination-button ${searchPage === index + 1 ? 'active-page' : ''}`} 
                    key={index} 
                    onClick={() => handleSearchPageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <div className="pagination-button-placeholder">
                  {searchPage < totalSearchPages && (
                    <button className="pagination-button prev-next-button" onClick={handleSearchNextClick}>
                      Next
                    </button>
                  )}
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;
