// Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import {Button, Card} from "react-bootstrap";



function Home() {
    // constant and setter for the number of jobs currently in the mongodb database
    const [jobCount, setJobCount] = useState(0);

    // constant and setter for the number of job seekers currently in the mongodb database
    const [applicantCount, setApplicantCount] = useState(0);

    // constant and setter for the number of recruiters currently in the mongodb database
    const [recruiterCount, setRecruiterCount] = useState(0);

    // job 1 for carousel
    const [job1, setJob1] = useState([]);

    // job 2 for carousel
    const [job2, setJob2] = useState([]);

    // job 3 for carousel
    const [job3, setJob3] = useState([]);


    // applicant 1 for carousel
    const [applicant1, setApplicant1] = useState([]);

    // applicant 2 for carousel
    const [applicant2, setApplicant2] = useState([]);

    // applicant 3 for carousel
    const [applicant3, setApplicant3] = useState([]);


    // recruiter 1 for carousel
    const [recruiter1, setRecruiter1] = useState([]);

    // recruiter 2 for carousel
    const [recruiter2, setRecruiter2] = useState([]);

    // recruiter 3 for carousel
    const [recruiter3, setRecruiter3] = useState([]);


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


        // Fetch user count
        axios.get('http://localhost:3000/api/recruiterCount')
            .then(response => {
                setRecruiterCount(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching Recruiter count:', error);
            });

        // fetch the job list, then shuffle to randomly get 3 jobs for the carousel cards
        axios.get('http://localhost:5000/api/jobs/getList')
            .then(response => {
                // Shuffle the jobs array
                const shuffledJobs = response.data.sort(() => Math.random() - 0.5);

                // Set the first job to the first card
                setJob1(shuffledJobs[0]);

                // Set the second job to the second card
                setJob2(shuffledJobs[1]);

                // Set the third job to the third card
                setJob3(shuffledJobs[2]);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });



        // fetch the applicant list, then shuffle to randomly get 3 applicants for the carousel cards
        axios.get('http://localhost:5000/api/getApplicantList')
            .then(response => {
                const jobSeekers = response.data.jobSeekers; // Access the jobSeekers array

                // Shuffle the applicants array
                const shuffledApplicants = jobSeekers.sort(() => Math.random() - 0.5);

                // Check if there are at least three applicants
                if (shuffledApplicants.length >= 3) {
                    // Set the first applicant to the first card
                    setApplicant1(shuffledApplicants[0]);

                    // Set the second applicant to the second card
                    setApplicant2(shuffledApplicants[1]);

                    // Set the third applicant to the third card
                    setApplicant3(shuffledApplicants[2]);
                } else {
                    console.error('Less than three applicants fetched.');
                }
            })
            .catch(error => {
                console.error('Error fetching applicants:', error);
            });


        // fetch the recruiter list, then shuffle to randomly get 3 recruiters for the carousel cards
        axios.get('http://localhost:5000/api/getRecruiterList')
            .then(response => {

                const Recruiters = response.data.Recruiters; // Access the jobSeekers array

                // Shuffle the applicants array
                const shuffledRecruiters= Recruiters.sort(() => Math.random() - 0.5);


                // Check if there are at least three applicants
                if (shuffledRecruiters.length >= 3) {
                    // Set the first Recruiters to the first card
                    setRecruiter1(shuffledRecruiters[0]);

                    // Set the second Recruiters to the second card
                    setRecruiter2(shuffledRecruiters[1]);

                    // Set the third Recruiters to the third card
                    setRecruiter3(shuffledRecruiters[2]);
                } else {
                    console.error('Less than three Recruiters fetched.');
                }
            })
            .catch(error => {
                console.error('Error fetching Recruiters:', error);
            });


    }, []);



        return (
        <div className="home-page-container">
            <h1 className="home-page-slogan">Propel Your Career or Business into the Future with Job Hub</h1>

            <div className="Home-page-content">
                <Carousel className="home-carousel" interval={6000}>

                    <Carousel.Item key={job1._id}>
                        <div className="home-carousel-card-container">
                            <Card>
                                <Card.Body>
                                    <h2>Job Listing</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{job1.title}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Job Type:</strong> {job1.jobType}<br/>
                                        <strong>Location:</strong> {job1.location}<br/>
                                        <strong>Salary:</strong> {job1.salary}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Job Listing</Button>*/}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Job Listing</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{job2.title}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Job Type:</strong> {job2.jobType}<br/>
                                        <strong>Location:</strong> {job2.location}<br/>
                                        <strong>Salary:</strong> {job2.salary}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Job Listing</Button>*/}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Job Listing</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{job3.title}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Job Type:</strong> {job3.jobType}<br/>
                                        <strong>Location:</strong> {job3.location}<br/>
                                        <strong>Salary:</strong> {job3.salary}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Job Listing</Button>*/}
                                </Card.Body>
                            </Card>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="home-carousel-card-container">
                            <Card>
                                <Card.Body>
                                    <h2>Applicant</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{applicant1.name}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Gender:</strong> {applicant1.gender}<br/>
                                        <strong>Email:</strong> {applicant1.email}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Applicant Profile</Button>*/}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Applicant</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{applicant2.name}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Gender:</strong> {applicant2.gender}<br/>
                                        <strong>Email:</strong> {applicant2.email}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Applicant Profile</Button>*/}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Applicant</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{applicant3.name}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Gender:</strong> {applicant3.gender}<br/>
                                        <strong>Email:</strong> {applicant3.email}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Applicant Profile</Button>*/}
                                </Card.Body>
                            </Card>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="home-carousel-card-container">
                            <Card>
                                <Card.Body>
                                    <h2>Recruiter</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{recruiter1.name}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Gender:</strong> {recruiter1.gender}<br/>
                                        <strong>Email:</strong> {recruiter1.email}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Recruiter Profile</Button>*/}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Recruiter</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{recruiter2.name}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Gender:</strong> {recruiter2.gender}<br/>
                                        <strong>Email:</strong> {recruiter2.email}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Recruiter Profile</Button>*/}
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Recruiter</h2>
                                    <hr/>
                                    <Card.Title className="home-card-title">{recruiter3.name}</Card.Title>
                                    <Card.Text className="home-card-text">
                                        <strong>Gender:</strong> {recruiter3.gender}<br/>
                                        <strong>Email:</strong> {recruiter3.email}
                                    </Card.Text>
                                    {/*<Button variant="primary" className="home-card-button">Go to Recruiter Profile</Button>*/}
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
                        <Card.Title className="home-card-title"><strong><span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{recruiterCount}</span></strong>: Recruiters</Card.Title>
                        <Card.Text className="home-card-text">
                            JobHub is bustling with the presence of a multitude of recruiters actively seeking talent, each bringing their unique opportunities to the platform.
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
