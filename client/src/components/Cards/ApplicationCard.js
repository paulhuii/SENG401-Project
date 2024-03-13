import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./DashboardCard.css"

function ApplicationCard({ application }) {
  const [isViewingApplication, setIsViewingApplication] = useState(false);

  const handleViewApplication = () => {
    setIsViewingApplication(true);
    // TODO: Implement view application feature
  };

  return (
    <div className="card-db" id='dashboard-card'>
        <div className="card-body applied-job">
            <h5 className="card-title-db">{application.jobTitle}</h5>
            <p className="card-text-db">{application.companyName}</p>
            <p className="card-text-db">{application.location}</p>
            <p className="card-text-db">Date Applied: {application.dateApplied}</p>
            <button type="button" className="btn btn-primary" onClick={handleViewApplication}>View Application</button>
        </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    jobTitle: PropTypes.string,
    companyName: PropTypes.string,
    location: PropTypes.string,
    dateApplied: PropTypes.string,
  }),
};

ApplicationCard.defaultProps = {
  application: {
    jobTitle: 'Job Title',
    companyName: 'Company Name',
    location: 'Location',
    dateApplied: 'Date Applied',
  },
};

export default ApplicationCard;