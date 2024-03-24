import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios'




// ApplyPopup.js
function ApplyPopup({ jobID, company, position, description, email, applied, user}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [applicationSent, setApplicationSent]  = useState(applied);
    const isRecruiter = (user ? (user.role === "Recruiter" ? true : false) : true) // Disable application if they are a recruiter or not signed in

    const sendApply = () => {
        const token = localStorage.getItem('token');

        fetch(`/api/jobs/apply/${jobID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers like authorization tokens if necessary
                'Authorization': `Bearer ${token}`

            },
            // If you need to send a body with the POST request, uncomment the following line
            // body: JSON.stringify({ /* your body data */ }), //*****MUST FILL OUT IF NEEDED************** */
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();  // or 'response.text()' if the response is not in JSON format
        })
        .then(data => {
            // Handle the successful application
            setApplicationSent(true); // Set the application sent state to true
            console.log("Your application was sent", data);
        })
        .catch(error => {
            // Handle errors here
            console.error("An error occurred during the application process", error);
        });
    };

    return (
        <>
            {/* The button component returned */}
            <Button data-testid="ApplyPopup" variant={applicationSent ? "success" : "primary"} onClick={handleShow} disabled={isRecruiter}>
                {isRecruiter ? "Log in as a Job Seeker to apply!" : applicationSent ? "Applied" : "Apply"}
            </Button>
            
            {/* The popup */}
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Apply for {position}</Modal.Title>
                </Modal.Header>

                <Modal.Body data-testid="ApplyPopupBody">
                    <p>Are you sure you want to apply for the position of <strong>{position}</strong>?</p> 
                    {/*  at <strong>{company}</strong>? */}
                </Modal.Body>

                <Modal.Footer>
                    <Button data-testid="ApplyPopupSendButton" variant="primary" onClick={() => {
                        sendApply();
                        handleClose(); // Close the modal after applying
                    }} disabled={applicationSent}>
                        {applicationSent ? "Application Sent!" : "Confirm Application"}
                    </Button>
                    <Button data-testid="ApplyPopupCancelButton" variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ApplyPopup;
