import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios'




function ApplyPopup({ company, position, description, email }) {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var emailProvided = email ? true : false;
    const [applicationSent, sent]  = useState(false);
    const [hasResume, choseResume] = useState(false);
  // File input constant
  const [file, setFile] = useState();

    // TODO: Upload a resume to the backend using Axios and Multer: https://www.youtube.com/watch?v=-7w2KtfiMEM
    const upload = () => {
        // Check if there was an upload
        if (document.getElementById("resume").value !== ''){
        const formData = new FormData()
        formData.append('file', file)
        axios.post('PATHTOCHANGE', formData)
        .then( res => {})
        .catch( er => console.log(er))
        }
    }

    // Executes when the applicant hits 'Apply'
    function sendApply() {
        console.log("Your application was sent to " + email); // TODO: Delete after implementing backend
        // TODO: Send application to company on the backend
        upload(); // Upload resume
        sent(true); // Flip boolean and change the apply button
    }

    

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
                    <input type="file" id="resume" accept='.docx, .doc, .pdf' disabled={applicationSent} onChange={(e) => {

                        // Check if our file has the appropriate extension:
                        var name = document.getElementById("resume").value;
                        if (name.slice(-4) === (".pdf") || name.slice(-4) === (".doc") || name.slice(-4) === (".docx")){
                        setFile(e.target.files[0]);
                        console.log("Resume set to " + name);
                        choseResume(true);
                        // Upload was moved to sendApply
                        } else {
                        // Rest if not what was expected
                        document.getElementById("resume").value = '';
                        console.log("Invalid file type selected...");
                        }

                        if (document.getElementById("resume").value === ''){
                            choseResume(false);
                        }
                    }}/>

                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title={hasResume ? "" : emailProvided ? "Choose a resume before applying" : "Company has no email to send resumes to!"}>
                    <Button variant={emailProvided ? applicationSent ? "success btn-lg":"primary btn-lg" : "secondary btn-lg"} onClick={sendApply} disabled={!hasResume || !emailProvided || applicationSent}>
                        {emailProvided ? applicationSent ? "Application sent!" :"Send Application" : "Company did not provide email!"}
                    </Button>
                    </span>

                    <Button variant="outline-dark btn-lg" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ApplyPopup;