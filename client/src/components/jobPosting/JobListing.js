import "./JobListing.css"
import ApplyPopup from "./ApplyPopup";

// Props fields so far: position:'', company:'', location:'', description:"", email:""
const JobListing = (props) => {
    
const user = JSON.parse(localStorage.getItem('user'));

return(

<div className="row-lg-4 d-flex align-items-stretch">
    <div className="jlcard w-100">
        <div className="jlcard-body">
            <h3 className="jlcard-title">{props.position ? props.position : "No position given"}</h3>
            {/* <h5>{props.company ? props.company : "No company given"} | <span className="text-muted">{props.location ? props.location : "No location given"}</span> </h5> */}
            <h5>{props.jobType ? props.jobType : "No job-type given"} | <span className="text-muted">{props.salary ? props.salary : "No salary information provided"}</span> </h5>

            <div className="description">
                <p className="jlcard-text">{props.description ? String(props.description).slice(0,256) + "..." : "No description available"}</p>
                <p className="jlcard-hover-text">{props.description ? props.description : "No description available"}</p>
            </div>
            {/* Contact Information */}
            <h5>Recruiter Contact Info: {props.email ? props.email : "No contact information provided"}</h5>
            <ApplyPopup 
                jobID = {props.jobID}
                company={props.location ? props.location : "N/A"}
                position={props.position ? props.position : "No position given"}
                description={props.description ? props.description : "No description available."} 
                email={props.email ? props.email : null}
                applied={props.applied ? props.applied : false}
                user= {user ? user : null}
            />
            {/* <span className="p-2 text-secondary"> {daysPassed > 1 ? "Posted "+daysPassed+" Days Ago": "Posted "+daysPassed+" Day Ago"}</span> */}
        </div>
    </div>      
</div>

    );

};

export default JobListing;