import React from "react";

const JobApplicationPopup = ({ position, company, email, onClose }) => {
    const handleApply = () => {
        alert(`Applying for ${position} at ${company}. Email: ${email}`);
        onClose(); // Close the popup after applying
    };

    return (
        <div className="job-application-popup">
            <div className="popup-content">
                <h2>Apply for {position} at {company}</h2>
                <p>Please send your application to: <strong>{email}</strong></p>
                <button className="btn btn-primary" onClick={handleApply}>Apply via Email</button>
                <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default JobApplicationPopup;
