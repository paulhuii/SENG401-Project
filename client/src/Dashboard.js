import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import JobListing from "./components/jobPosting/JobListing";
import CompanyCard from "./components/Cards/CompanyCard";
import ApplicationCard from "./components/Cards/ApplicationCard";

function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('My Applications');
  const [companyPage, setCompanyPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const [applicationPage, setApplicationPage] = useState(1);
  const itemsPerPage = 5; 
  const [appliedJobs, setAppliedJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  
  // replace with actual data
  const companies = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Company ${index + 1}`,
    location: `Location ${index + 1}`,
  }));

  const[jobs, updateJobListings] = useState([ ]);
  
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
  


      useEffect(() => {
        if (selectedMenuItem === 'My Applications') {
          const token = localStorage.getItem('token');
          fetch('/api/appliedJobs', {  
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch applied jobs');
            }
            return response.json();
          })
          .then(data => {
                  // Logging each job ID for debugging purposes
      data.forEach(job => {
        console.log(`Job ID: ${job._id}`); // Make sure job._id is not undefined
      });
            setAppliedJobs(data);  // Store the applied jobs in the state
          })
          .catch(error => {
            console.error("Error fetching applied jobs:", error);
          });
        }
      }, [selectedMenuItem]);

  const totalCompanyPages = Math.ceil(companies.length / itemsPerPage);
  const totalJobPages = Math.ceil(jobs.length / itemsPerPage);
  const totalApplicationPages = Math.ceil(appliedJobs.length / itemsPerPage);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleCompanyPageClick = (pageNumber) => {
    setCompanyPage(pageNumber);
  };

  const handleJobPageClick = (pageNumber) => {
    setJobPage(pageNumber);
  };

  const handleApplicationPageClick = (pageNumber) => {
    setApplicationPage(pageNumber);
  };

  const handleCompanyPreviousClick = () => {
    if (companyPage > 1) {
      setCompanyPage(companyPage - 1);
    }
  };
  
  const handleCompanyNextClick = () => {
    if (companyPage < totalCompanyPages) {
      setCompanyPage(companyPage + 1);
    }
  };
  
  const handleJobPreviousClick = () => {
    if (jobPage > 1) {
      setJobPage(jobPage - 1);
    }
  };
  
  const handleJobNextClick = () => {
    if (jobPage < totalJobPages) {
      setJobPage(jobPage + 1);
    }
  };
  
  const handleApplicationPreviousClick = () => {
    if (applicationPage > 1) {
      setApplicationPage(applicationPage - 1);
    }
  };

  const handleApplicationNextClick = () => {
    if (applicationPage < totalApplicationPages) {
      setApplicationPage(applicationPage + 1);
    }
  };

  const currentCompanies = companies.slice((companyPage - 1) * itemsPerPage, companyPage * itemsPerPage);
  const currentJobs = jobs.slice((jobPage - 1) * itemsPerPage, jobPage * itemsPerPage);
  const currentApplications = appliedJobs.slice((applicationPage - 1) * itemsPerPage, applicationPage * itemsPerPage);

  return (
    <div className="page-container">
      <h1 className="page-title">My Dashboard</h1>
      
      <div className="content">
        {/* <p>Welcome to the dashboard page!</p> */}
        <div className="divider">
          <div className="menu">  
            <div className={`menu-item ${selectedMenuItem === 'My Applications' ? 'active' : ''}`} onClick={() => handleMenuItemClick('My Applications')}>My Applications</div>
            {/* <div className={`menu-item ${selectedMenuItem === 'Browse Available Jobs' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Browse Available Jobs')}>Browse Available Jobs</div> */}
            {/*<div className={`menu-item ${selectedMenuItem === 'My Network' ? 'active' : ''}`} onClick={() => handleMenuItemClick('My Network')}>My Network</div>*/}
          </div>

          <div className="menu-content">
          {selectedMenuItem === 'My Applications' && 
            <div className="content-item-db">
              <div className='card-columns applications'> 
              {appliedJobs.length === 0 ? (
                <div>
                  <h2 className='no-application'>You have not applied for any job</h2>
                  <button 
                    className='start-applying-btn' 
                    onClick={() => navigate('../JobBoard/search?query=&category=search_all')}
                  >
                    Browse Available Jobs
                  </button>
                </div>
              ) : (
                currentApplications.map(job => (
                  <ApplicationCard 
                    key={job._id} 
                    application={{
                      jobID: job._id,
                      jobTitle: job.title,
                      companyName: job.company,
                      location: job.location,
                      dateApplied: job.dateApplied,
                      description: job.description,
                      salary: job.salary,
                      jobType: job.jobType,
                      contact: job.contact,
                    }}
                  />
                ))
              )}
              </div>
              <div className="pagination">
                <div className="pagination-button-placeholder">
                  {applicationPage > 1 && (
                    <button className="pagination-button prev-next-button prev" onClick={handleApplicationPreviousClick}>
                      Previous
                    </button>
                  )}
                </div>
                {[...Array(totalApplicationPages)].map((_, index) => (
                  <button 
                    className={`pagination-button ${applicationPage === index + 1 ? 'active-page' : ''}`} 
                    key={index} 
                    onClick={() => handleApplicationPageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <div className="pagination-button-placeholder">
                  {applicationPage < totalApplicationPages && (
                    <button className="pagination-button prev-next-button next" onClick={handleApplicationNextClick}>
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          }
            {selectedMenuItem === 'My Network' &&
            <div className="content-item-db">
              <div className='card-columns companies'> 
                {currentCompanies.map(company => <CompanyCard key={company.id} company={company} />)}
              </div>
              <div className="pagination">
                <div className="pagination-button-placeholder">
                  {companyPage > 1 && (
                    <button className="pagination-button prev-next-button prev" onClick={handleCompanyPreviousClick}>
                      Previous
                    </button>
                  )}
                </div>
                {[...Array(totalCompanyPages)].map((_, index) => (
                  <button 
                    className={`pagination-button ${companyPage === index + 1 ? 'active-page' : ''}`} 
                    key={index} 
                    onClick={() => handleCompanyPageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <div className="pagination-button-placeholder">
                {companyPage < totalCompanyPages && (
                  <button className="pagination-button prev-next-button next" onClick={handleCompanyNextClick}>
                    Next
                  </button>
                )}
                </div>
              </div>
            </div>}
            {selectedMenuItem === 'Browse Available Jobs' && 
            <div className="content-item-db">
              <div className="card-columns job-listing">
                {currentJobs.map(job => 
                  <JobListing
                    key = {job._id}
                    jobID = {job._id}
                    position={job.title} 
                    company={job.company} 
                    location={job.location} 
                    description={job.description} 
                    email={job.contact}
                    salary={job.salary}
                    jobType={job.jobType}
                    applied={job['applicants'].indexOf(user['_id']) !== -1? true : false}
                  />
                )}
              </div>
              <div className="pagination">
                <div className="pagination-button-placeholder">
                  {jobPage > 1 && (
                    <button className="pagination-button prev-next-button prev" onClick={handleJobPreviousClick}>
                      Previous
                    </button>
                  )}
                </div>
                {[...Array(totalJobPages)].map((_, index) => (
                  <button 
                    className={`pagination-button ${jobPage === index + 1 ? 'active-page' : ''}`} 
                    key={index} 
                    onClick={() => handleJobPageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <div className="pagination-button-placeholder">
                  {jobPage < totalJobPages && (
                    <button className="pagination-button prev-next-button next" onClick={handleJobNextClick}>
                      Next
                    </button>
                  )}
                </div>

              </div>
            </div>}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;