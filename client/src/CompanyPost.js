import React from 'react';
import "./CompanyPost.css"
import "./components/TextEditor/RichTextEditor"
import RichTextEditor from "./components/TextEditor/RichTextEditor";

const CompanyPost = () => {

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center company-post-pg">
            <form className="row shadow mt-3 mb-3 p-3 rounded bg-white company-post-form">
                <div className="col">
                    <h1 className="post-heading text-center">Create A New Job Listing</h1>
                    <p className="instruction-text text-center">Fill the form below then click submit</p>

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

                    <label className="description-label mb-2">Description</label>
                    <RichTextEditor/>

                    <div className="d-flex justify-content-center align-items-center pt-3">
                        <button type="button" className="btn btn-primary post-btns">Submit</button>
                        <a href="/CompanyDashboard" className="btn btn-primary post-btns">Cancel</a>
                    </div>
                </div>
            </form>
        </div>
        )
}

export default CompanyPost