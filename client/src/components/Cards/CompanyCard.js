import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./DashboardCard.css"

function CompanyCard({ company }) {
  const [isFollowing, setIsFollowing] = useState(true);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // TODO: Implement follow company feature
  };

  const handleViewJobs = () => {
    // TODO: Implement view jobs feature
  };

  return (
    <div className="card-db" id='dashboard-card'>
        <div className="card-body recruiter">
            <h5 className="card-title-db">{company.name}</h5>
            <p className="card-text-db">{company.location}</p>
            <p className="card-text-db">Email: {company.email}</p>
            <button type="button" className="btn btn-primary"onClick={handleViewJobs}>View Profile</button>
            <button type="button" className="btn btn-primary" onClick={handleFollow}>{isFollowing ? 'Followed' : 'Follow'}</button>
        </div>
    </div>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
  }),
};

CompanyCard.defaultProps = {
  company: {
    name: 'Company Name',
    location: 'Location',
    email: 'Email',
  },
};

export default CompanyCard;
