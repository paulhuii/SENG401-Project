import React, { useState, useEffect } from 'react';
import "./ViewApplicants.css";
import { IoMdDownload } from "react-icons/io";
import { Button } from "react-bootstrap";

const ViewApplicants = ({ jobID }) => {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        // Assuming you have a way to include the authorization token
        const token = localStorage.getItem('token');

        fetch(`/api/jobs/${jobID}/applicants`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch applicants');
            }
            return response.json();
        })
        .then(data => {
            setApplicants(data); // Assuming the backend sends an array of applicants
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [jobID]); // This effect runs whenever jobID changes

    return (
        <div className="container-fluid shadow p-3 mb-3">
            {applicants.map((applicant, index) => (
                <div key={index} className="row">
                    <div className="col">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6>Applicant Name: {applicant.name}</h6>
                            <Button className="d-flex align-items-center" variant="outline-success" href={applicant.resumeLink /* Modify this according to how you store resume links */}>
                                <div className="me-2">Resume</div>
                                <IoMdDownload />
                            </Button>
                        </div>
                        <h6>Email: {applicant.email}</h6>
                        <h6>Gender: {applicant.gender}</h6>
                        <h6>Description:</h6>
                        <p>{applicant.description}</p>
                        <hr/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewApplicants;
