import React, {useEffect, useState } from 'react';
import './Dashboard.css';
import JobListing from "./components/jobPosting/JobListing";
import CompanyCard from "./components/Cards/CompanyCard";
import ApplicationCard from "./components/Cards/ApplicationCard";

function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('My Network');
  const [companyPage, setCompanyPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const [applicationPage, setApplicationPage] = useState(1);
  const itemsPerPage = 5; 

  // replace with actual data
  const companies = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Company ${index + 1}`,
    location: `Location ${index + 1}`,
  }));

  // replace with actual data
  // const jobs = Array.from({ length: 20 }, (_, index) => ({
  //   id: index + 1,
  //   // Add more fields as needed
  // }));

    // TODO: An example of how data should be formatted in the array. Once backend is connected, you can make this empty and update it when required.
  const[jobs, updateJobListings] = useState([ ]);
    
  
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
  

  // replace with actual data
  const applications = Array.from({ length: 20 }, (_, index) => ({ 
    id: index + 1, 
    jobTitle: `Job ${index + 1}`,
    companyName: `Company ${index + 1}`, 
    location: `Location ${index + 1}`,
    dateApplied: new Date(Date.now() - (20 - index) * 86400000).toLocaleDateString(),
    salary: `$${index * 10000}`,
  }));

  const totalCompanyPages = Math.ceil(companies.length / itemsPerPage);
  const totalJobPages = Math.ceil(jobs.length / itemsPerPage);
  const totalApplicationPages = Math.ceil(applications.length / itemsPerPage);

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
  const currentApplications = applications.slice((applicationPage - 1) * itemsPerPage, applicationPage * itemsPerPage);

  return (
    <div className="page-container">
      <h1 className="page-title">My Dashboard</h1>
      
      <div className="content">
        {/* <p>Welcome to the dashboard page!</p> */}
        <div className="divider">
          <div className="menu">  
            <div className={`menu-item ${selectedMenuItem === 'My Network' ? 'active' : ''}`} onClick={() => handleMenuItemClick('My Network')}>My Network</div>
            <div className={`menu-item ${selectedMenuItem === 'Browse Available Jobs' ? 'active' : ''}`} onClick={() => handleMenuItemClick('Browse Available Jobs')}>Browse Available Jobs</div>
            <div className={`menu-item ${selectedMenuItem === 'My Applications' ? 'active' : ''}`} onClick={() => handleMenuItemClick('My Applications')}>My Applications</div>
          </div>

          <div className="menu-content">
            {selectedMenuItem === 'My Network' && 
            <div className="content-item-db">
              <h1>My Network</h1>
              <h5 className="mb-3">View and connect with companies in your network!</h5>
              <div className='card-columns companies'> 
                {currentCompanies.map(company => <CompanyCard key={company.id} company={company} />)}
              </div>
              <div className="pagination">
                <div className="pagination-button-placeholder">
                  {companyPage > 1 && (
                    <button className="pagination-button prev-next-button" onClick={handleCompanyPreviousClick}>
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
                  <button className="pagination-button prev-next-button" onClick={handleCompanyNextClick}>
                    Next
                  </button>
                )}
                </div>
              </div>
            </div>}
            {selectedMenuItem === 'Browse Available Jobs' && 
            <div className="content-item-db">
              <h1>Browse Available Jobs</h1>
              <h5 className="mb-3">View and apply to available jobs!</h5>
              <div className="card-columns job-listing">
                {currentJobs.map(job => 
                  <JobListing 
                    position={job.title} 
                    company={job.company} 
                    location={job.location} 
                    description={job.description} 
                    email={job.contact}
                    salary={job.salary}
                    jobType={job.jobType}
                  />
                )}
              </div>
              <div className="pagination">
                <div className="pagination-button-placeholder">
                  {jobPage > 1 && (
                    <button className="pagination-button prev-next-button" onClick={handleJobPreviousClick}>
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
                    <button className="pagination-button prev-next-button" onClick={handleJobNextClick}>
                      Next
                    </button>
                  )}
                </div>

              </div>
            </div>}
            {selectedMenuItem === 'My Applications' && 
            <div className="content-item-db">
              <h1>My Applications</h1>
              <h5 className="mb-3">View your previous applications!</h5>
              <div className='card-columns applications'> 
                {currentApplications.map(application => <ApplicationCard key={application.id} application={application} />)}
              </div>
              <div className="pagination">
                <div className="pagination-button-placeholder">
                  {applicationPage > 1 && (
                    <button className="pagination-button prev-next-button" onClick={handleApplicationPreviousClick}>
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
                    <button className="pagination-button prev-next-button" onClick={handleApplicationNextClick}>
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