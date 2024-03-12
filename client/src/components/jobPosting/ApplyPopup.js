import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";



function ApplyPopup({ company, position, description, email }) {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Executes when the applicant hits 'Apply'
    function sendApply() {
        console.log("Your application was sent to " + email); // TODO: Delete after implementing backend
        // TODO: Send application to company on the backend
        sent(true); // Flip boolean and change the apply button
    }

    var emailProvided = email ? true : false;
    const [applicationSent, sent]  = useState(false);

    return (
        <>
            {/* The button component returned */}
            <Button variant={applicationSent ? "success" : "primary"} onClick={handleShow}>
                {applicationSent ? <span ><i style={{margin: '5px'}} class="bi bi-check2-circle"></i>Applied</span> : "Apply"}
            </Button>
            

            {/* The popup */}
            <Modal show={show} onHide={handleClose} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title><h2>{position} at {company}</h2></Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto',fontSize:'22px' }}>
                    {description}
                </Modal.Body>

                <Modal.Footer >
                    <Button variant={emailProvided ? applicationSent ? "success btn-lg":"primary btn-lg" : "secondary btn-lg"} onClick={sendApply} disabled={!emailProvided || applicationSent}>
                        {emailProvided ? applicationSent ? "Application sent!" :"Send Application" : "Company did not provide email!"}
                    </Button>

                    <Button variant="outline-dark btn-lg" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ApplyPopup;