import React, {useState} from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import {Button, Modal} from "react-bootstrap";
import ViewApplicants from "../ViewApplicants/ViewApplicants";
import './JobListingCard.css'

const JobListingCard = ({ position, company, location, description, email, jobType, salary, job, deleteJob }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteJob = () => {
        // Call deleteJob function and pass job ID as argument
        deleteJob(job._id);
    };

    return (
        <div className="container-fluid shadow rounded p-3 mb-3">
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <h4>{position}</h4>
                    <div className="d-flex align-items-center justify-content-center">
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Button className="me-2 mb-2" variant="outline-info" onClick={handleShow}>
                            View Applicants
                        </Button>

                        <Modal centered size="xl" show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>View Applicants</Modal.Title>
                            </Modal.Header>

                            {/* <Modal.Body style={{ maxHeight: 'calc(100vh - 25vh)', overflowY: 'auto' }}>
                                <h5 className="mb-3">View all prospective applicants!</h5>
                                <ViewApplicants/>
                                <ViewApplicants/>
                                <ViewApplicants/>
                                <ViewApplicants/>
                                <ViewApplicants/>
                                <ViewApplicants/>
                            </Modal.Body> */}

                            <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                                {/* Pass job._id as a prop to ViewApplicants */}
                                <ViewApplicants jobID={job._id} />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="outline-secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <div>
                            {/*<Button className="me-2 mb-2" variant="outline-warning" href="/underdevelopment">*/}
                            {/*    <FaEdit/>*/}
                            {/*</Button>*/}

                            <Button className="mb-2" variant="outline-danger" onClick={handleDeleteJob}>
                                <BsTrash3Fill/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col d-flex">
                    <h6 className="shadow-sm p-2 rounded bg-secondary me-2 text-white">{jobType}</h6>
                </div>
            </div>

            <h5>{location}</h5>

            <h5>Salary: {salary}</h5>

            <h5>Contact Information: {email}</h5>

            <h5>Description</h5>
            <p>{description}</p>
        </div>
    );
}

export default JobListingCard;
