import "./JobListing.css"



const JobListing = (props) => {

    // Put a random day until we can get that information from the backend
    var daysPassed = Math.floor(Math.random()*10) + 1;

    return(
    <div class="row-lg-4 d-flex align-items-stretch">
        <div class="card w-100">
        <div class="card-body">
            <h3 class="card-title">{props.position ? props.position : "No position given"}</h3> 
            <h5>{props.company ? props.company : "No company given"} | <span class="text-muted">{props.location ? props.location : "No location given"}</span> </h5>
            <div class="description">
                <p class="card-text">{props.description ? String(props.description).slice(0,256) + "..." : "No description available"}</p>
                <p class="card-hover-text">{props.description ? props.description : "No description available"}</p>
            </div>
            <button class="btn btn-primary p-2" type="submit">Apply</button> 
            {/* May have to alter logic if we are accounting for hours as well */}
            <span class="p-2 text-secondary"> {daysPassed > 1 ? "Posted "+daysPassed+" Days Ago": "Posted "+daysPassed+" Day Ago"}</span>
        </div>
        </div>
    </div>
    );

};

export default JobListing;