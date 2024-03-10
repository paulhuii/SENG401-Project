import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import "./CompanyPost.css";
import RichTextEditor from "./components/TextEditor/RichTextEditor";

const CompanyPost = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [jobDescription, setJobDescription] = useState('');
    const [error, setError] = useState(null); // State to handle error messages

    const titleRef = useRef();
    const typeRef = useRef();
    const locationRef = useRef();
    const salaryRef = useRef();
    const contactRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const jobData = {
            title: titleRef.current.value,
            jobType: typeRef.current.value,
            location: locationRef.current.value,
            salary: salaryRef.current.value,
            contact: contactRef.current.value,
            description: jobDescription,
        };
        const token = localStorage.getItem('token');
        console.log('Sending request to /api/jobs with data:', jobData);
        console.log('Authorization Token:', token);
        console.log(`Bearer ${localStorage.getItem('token')}`);

        try {
            console.log(token); // This should output the token to the console
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,

                },
                body: JSON.stringify(jobData),
            });

            const data = await response.json(); // Always parse the JSON to get data

            if (!response.ok) {
                // Handle error - extract error message from response and show to user
                console.error(data.message);
                throw new Error(data.message|| 'Failed to create job'); // Use the error message from response if available
            }


            // Handle success - maybe redirect to another page or show a success message
            console.log("Job successfully created!",data);
            // Redirect to CompanyDashboard or reset form
            navigate('/CompanyDashboard', { state: { jobPosted: true, jobData: data } });

        } catch (error) {
            console.error('Failed to create job', error);
            setError(error instanceof Error ? error.message : String(error));

        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center company-post-pg">
            <form className="row shadow mt-3 mb-3 p-3 rounded bg-white company-post-form" onSubmit={handleSubmit}>
                <div className="col">
                    <h1 className="post-heading text-center">Create A New Job Listing</h1>
                    <p className="instruction-text text-center">Fill the form below then click submit</p>

                    <label htmlFor="job-title" className="form-label">Job Title</label>
                    <input type="text" className="form-control" id="job-title" ref={titleRef}/>

                    <label htmlFor="job-type" className="form-label">Job Type</label>
                    <input type="text" className="form-control" id="job-type" placeholder="Part-time, Full-time" ref={typeRef}/>

                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" ref={locationRef}/>

                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="salary" ref={salaryRef}/>

                    <label htmlFor="contact" className="form-label">Contact Information</label>
                    <input type="text" className="form-control" id="contact" ref={contactRef}/>

                    <label className="description-label mb-2">Description</label>
                    <RichTextEditor value={jobDescription} setValue={setJobDescription}/>

                    <div className="d-flex justify-content-center align-items-center pt-3">
                        <button type="submit" className="btn btn-primary post-btns">Submit</button>
                        <button onClick={() => navigate('/CompanyDashboard')} className="btn btn-primary post-btns">Cancel</button>
                    </div>
                </div>
            </form>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

        </div>
    );
}

export default CompanyPost;
