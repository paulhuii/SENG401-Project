import React from 'react';
import "./CompanyPost.css"
import "./RichTextEditor"
import RichTextEditor from "./RichTextEditor";

const CompanyPost = () => {

    return (
        <div className="container company-post-page">
            <form className="company-post-row">
                <div className="company-post-col">
                    <h1 className="post-heading">Create A New Job Listing</h1>
                    <p className="instruction-text">Fill the form below then click submit</p>

                    <label htmlFor="job-title" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="job-title"/>

                    <label htmlFor="job-type" className="form-label">Job Type</label>
                    <input type="text" className="form-control" id="job-type" placeholder="Part-time, Full-time"/>

                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location"/>

                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="salary"/>

                    <label htmlFor="contact" className="form-label">Contact Information</label>
                    <input type="text" className="form-control" id="contact"/>

                    <label className="description-label">Description</label>
                    <RichTextEditor/>

                    <div className="submit-btn-container">
                        <button type="button" className="btn btn-primary submit-btn">Submit</button>
                    </div>
                </div>
            </form>
        </div>
        )
}

export default CompanyPost