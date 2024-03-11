import "./JobListing.css"
import ApplyPopup from "./ApplyPopup";

// Props fields so far: position:'', company:'', location:'', description:"", email:""
const JobListing = (props) => {

    // TODO: Put a random day until we can get that information from the backend
    var daysPassed = Math.floor(Math.random()*10) + 1;

    return(
    <div class="row-lg-4 d-flex align-items-stretch">
        <div class="jlcard w-100">
        <div class="jlcard-body">
            <h3 class="jlcard-title">{props.position ? props.position : "No position given"}</h3> 
            <h5>{props.company ? props.company : "No company given"} | <span class="text-muted">{props.location ? props.location : "No location given"}</span> </h5>
            <div class="description">
                <p class="jlcard-text">{props.description ? String(props.description).slice(0,256) + "..." : "No description available"}</p>
                <p class="jlcard-hover-text">{props.description ? props.description : "No description available"}</p>
            </div>
            
            <ApplyPopup 
                company={props.company ? props.company : "no company given"}
                position={props.position ? props.position : "No position given"}
                description={props.description ? props.description : "No description available."} 
                email={props.email ? props.email : null}
            />
            <span class="p-2 text-secondary"> {daysPassed > 1 ? "Posted "+daysPassed+" Days Ago": "Posted "+daysPassed+" Day Ago"}</span>
        </div>
        </div>
    </div>
    );

};

export default JobListing;