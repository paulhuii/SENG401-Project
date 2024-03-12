import React from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const JobListingCard = ({ position, company, location, description, email, jobType }) => {
    return (
        <div className="container-fluid shadow rounded p-3 mb-3">
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <h4>Job Title: {position}</h4>
                    <div>
                        <button type="button" className="btn btn-warning text-white me-2">
                            <FaEdit />
                        </button>
                        <button type="button" className="btn btn-danger">
                            <BsTrash3Fill/>
                        </button>
                    </div>
                </div>
            </div>

            <h5>Location: {location}</h5>
            <div className="row">
                <div className="col d-flex">
                    <h6 className="shadow-sm p-2 rounded bg-primary me-2 text-white">{jobType}</h6>
                </div>
            </div>

            <h5>Contact Information: {email}</h5>

            <h5>Description</h5>
            <p>{description}</p>
        </div>
    );
}

export default JobListingCard;
