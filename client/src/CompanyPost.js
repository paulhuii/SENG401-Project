import React from 'react';
import "./CompanyPost.css"
import "./RichTextEditor"
import RichTextEditor from "./RichTextEditor";

const CompanyPost = () => {

    return (
        <div className="container company-post-page">
            <form>
                <h1>Create A New Job Listing</h1>
                <p className="instruction-text">Fill the form below then click submit</p>

                <div>
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    {/* Disable input field, should pull name from database */}
                    <input type="text" className="form-control" id="companyName" disabled/>
                </div>

                <div>
                    <label htmlFor="job-title" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="job-title"/>
                </div>

                <div>
                    <label htmlFor="job-type" className="form-label">Job Type</label>
                    <input type="text" className="form-control" id="job-type" placeholder="Part-time, Full-time"/>
                </div>


                <div>
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location"/>
                </div>

                <div>
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="salary"/>
                </div>

                <div>
                    <label htmlFor="contact" className="form-label">Contact Information</label>
                    <input type="text" className="form-control" id="contact"/>
                </div>

                <label className="description-label">Description</label>
                <RichTextEditor/>
            </form>
            <button type="button" className="btn btn-primary submit-btn">Submit</button>
        </div>
        )
}

export default CompanyPost