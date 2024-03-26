import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./DashboardCard.css"

function ApplicationCard({ application }) {
  const [isViewingApplication, setIsViewingApplication] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

  const handleViewApplication = () => {
    setIsViewingApplication(!isViewingApplication);
    // TODO: Implement view application feature

  };

  return (
    <div className="card-db" id='dashboard-card'>
        <div className="card-body applied-job"> 
            <h5 className="card-title-db">{application.jobTitle}</h5>
            <p className="card-text-db">{application.companyName}</p>
            <p className="card-text-db">{application.location}</p>
            {/*<p className="card-text-db">Date Applied: {application.dateApplied}</p>*/}
            <button type="button" className="btn btn-primary" onClick={handleViewApplication}>
              {isViewingApplication ? 'Hide Details' : 'View Details'}
            </button>       
        </div>
        {isViewingApplication && (
          <div className="application-details">
            <p> {application.jobType} | {application.salary}</p>
            <p> Contact: {application.contact}</p>
            <div className="description">
                <p className="jlcard-text">{application.description ? String(application.description).slice(0,256) + "..." : "No description available"}</p>
                <p className="jlcard-hover-text">{application.description ? application.description : "No description available"}</p>
            </div>
          </div>
        )}
    </div>
  );
}

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    jobTitle: PropTypes.string,
    companyName: PropTypes.string,
    location: PropTypes.string,
    dateApplied: PropTypes.string,
    salary: PropTypes.string,
    jobType: PropTypes.string,
    description: PropTypes.string,
    contact: PropTypes.string,
  }),
};

ApplicationCard.defaultProps = {
  application: {
    jobID: 'Job ID',
    jobTitle: 'Job Title',
    companyName: 'Company Name',
    location: 'Location',
    dateApplied: 'Date Applied',
    salary: '$$$$$$',
    jobType: 'Type',
    description: "No description given",
    contact: "No contact information given",
  },
};

export default ApplicationCard;