// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import {Button, Card} from "react-bootstrap";


function Home() {
    // constant and setter for the number of jobs currently in the mongodb database
    const [jobCount, setJobCount] = useState(0);

    // constant and setter for the number of jobseekers currently in the mongodb database
    const [applicantCount, setApplicantCount] = useState(0);

    useEffect(() => {
        // Fetch job count
        axios.get('http://localhost:3000/api/jobs/count')
            .then(response => {
                setJobCount(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching job count:', error);
            });

        // Fetch user count
        axios.get('http://localhost:3000/api/applicantCount')
            .then(response => {
                setApplicantCount(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching Applicant count:', error);
            });

    }, []);



        return (
        <div className="home-page-container">
            <h1 className="home-page-slogan">Propel Your Career or Business into the Future with Job Hub</h1>

            <div className="Home-page-content">
                <Carousel className="home-carousel" interval={6000}>
                    <Carousel.Item>
                        <div className="home-carousel-card-container">
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Job 1</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Job 1 and some info about the jobs
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Job Listing</Button>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Job 2</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Job 2 and some info about the jobs
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Job Listing</Button>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Job 3</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Job 3 and some info about the jobs
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Job Listing</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="home-carousel-card-container">
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Job Applicant 1</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Job Applicant 1 and some info about then
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Applicant Profile</Button>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Job Applicant 2</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Job Applicant 2 and some info about then
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Applicant Profile</Button>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Job Applicant 3</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Job Applicant 3 and some info about then
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Applicant Profile</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="home-carousel-card-container">
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Company 1</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Company 1 and info about it/job positions available
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Company Profile</Button>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Company 2</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Company 2 and info about it/job positions available
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Company Profile</Button>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title className="home-card-title">Company 3</Card.Title>
                                    <Card.Text className="home-card-text">
                                        Company 3 and info about it/job positions available
                                    </Card.Text>
                                    <Button variant="primary" className="home-card-button">Go to Company Profile</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="home-stats">
                <Card>
                    <Card.Img variant="top"  src="/briefcase.png" style={{ height: "50px", width: "50px",  margin: "0 auto" }}/>
                    <Card.Body>
                        <Card.Title className="home-card-title"><strong><span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{jobCount}</span></strong> Job Listings</Card.Title>
                        <Card.Text className="home-card-text">
                            Explore countless job opportunities with Job Hub or showcase your company's openings and connect with our vibrant community of career seekers!
                        </Card.Text>


                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src="/building.png" style={{ height: "50px", width: "50px",  margin: "0 auto"}}/>
                    <Card.Body>
                        <Card.Title className="home-card-title">Companies</Card.Title>
                        <Card.Text className="home-card-text">
                            List number of companies hiring on job hub
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src="/group.png"  style={{ height: "50px", width: "50px",  margin: "0 auto"}}/>
                    <Card.Body>
                        <Card.Title className="home-card-title"> <strong><span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{applicantCount}</span></strong>: Applicants</Card.Title>
                        <Card.Text className="home-card-text">
                            Join the ranks of the talented applicants already making waves on Job Hub! Your next career move could just be one click away!
                        </Card.Text>

                    </Card.Body>
                </Card>
            </div>

            <footer className="home-footer">
                <a href="https://www.flaticon.com/free-icons/briefcase" title="briefcase icons" style={{ color: "black", marginRight: "30px" }}>Briefcase icons created by Those Icons - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/people" title="people icons" style={{ color: "black", marginRight: "30px" }}>People icons created by Freepik - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/company" title="company icons" style={{ color: "black" }}>Company icons created by Freepik - Flaticon</a>
            </footer>


        </div>
    );
}

export default Home;
