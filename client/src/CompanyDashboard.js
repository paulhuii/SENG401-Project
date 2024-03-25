import React, { useState, useEffect } from 'react';
import { Col, Nav, Row, Tab } from "react-bootstrap";
import "./CompanyDashboard.css";
import JobListingCard from "./components/JobListings/JobListingCard";

const CompanyDashboard = () => {
    const [jobListings, setJobListings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchJobListings();
    }, []);

    const fetchJobListings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/jobs/list',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch job listings');
            const data = await response.json();
            setJobListings(data);
        } catch (error) {
            console.error("Error fetching job listings:", error);
        }
    };

    const deleteJob = async (jobId) => {
        try {
            const token = localStorage.getItem('token');
            console.log(jobId);
            const response = await fetch(`/api/jobs/deleteJob/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete job');
            fetchJobListings(); // Refresh job listings after deletion
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row mt-3 mb-1 p-2 company-dash-header">
                <div className="col d-flex align-items-center justify-content-between">
                    <h1>Company Dashboard</h1>
                    <a href="/CompanyPost" className="btn btn-primary">List a New Job</a>
                </div>
            </div>

            <div className="row">
                <Tab.Container id="company-dash-menu" defaultActiveKey="job_listings">
                    <Row>
                        <Col lg={2} md={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="job_listings">Job Listings</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={10} md={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="job_listings">
                                    <h1>Job Listings</h1>
                                    <h5 className="mb-3">View, delete, and edit your job listings here!</h5>
                                    {
                                    jobListings.map((job, index) => {
                                        
                                        console.log("Your ID is: ",user._id)
                                        // console.log(`Rendering job ${index}`, job); // Check each job being rendered
                                        if (user._id === job.postedBy) {
                                            return (
                                                <JobListingCard
                                                    position={job.title}
                                                    company={job.company}
                                                    location={job.location}
                                                    email={job.contact} // Assuming 'email' is part of your data
                                                    description={job.description}
                                                    jobType={job.jobType}
                                                    salary={job.salary}
    
                                                    // things required to delete a job listing
                                                    key={job._id.toString()}
                                                    job={job}
                                                    deleteJob={deleteJob}
                                                />
                                            );
                                        }
                                        
                                    })}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    );
};

export default CompanyDashboard;
