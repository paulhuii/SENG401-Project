import "./JobListing.css"


const JobListing = () => {

    return(
    <div class="row-lg-4 d-flex align-items-stretch">
        <div class="card w-100">
        <div class="card-body">
            <h2 class="card-title">Job Position</h2> 
            <h5>Company</h5>
            <p class="card-text"> Job Description </p>
            <button class="btn btn-primary" type="submit">Apply</button>
        </div>
        </div>
    </div>
    );
};

export default JobListing;