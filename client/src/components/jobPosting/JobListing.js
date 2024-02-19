import "./JobListing.css"


const JobListing = () => {

    return(
    <div class="row-lg-4 d-flex align-items-stretch">
        <div class="card w-100">
        <div class="card-body">
            <h3 class="card-title">Job Position</h3> 
            <h5>Company | <span class="text-muted">Location</span> </h5>
            <div class="description">
                <p class="card-text">
                    First Few Lines of Job Application Description
                    <p></p> 
                    Strong understanding or Snowflake on Azure Architecture, design, implementation and operationalization of large-scale data and analytics solutions on Snowflake Cloud Data Warehouse.
                    Hands-on development experience with Snowflake features such as Snow SQL; Snow Pipe; Python; Tasks; Streams; Time travel; Zero Copy Cloning; Optimizer; Metadata Manager; data sharing; and stored procedures.
                </p>
                <p class="card-hover-text">
                    Full Job Application Example:
                    <p></p> 
                    Strong understanding or Snowflake on Azure Architecture, design, implementation and operationalization of large-scale data and analytics solutions on Snowflake Cloud Data Warehouse.
                    Hands-on development experience with Snowflake features such as Snow SQL; Snow Pipe; Python; Tasks; Streams; Time travel; Zero Copy Cloning; Optimizer; Metadata Manager; data sharing; and stored procedures.
                    Experience in Data warehousing - OLTP, OLAP, Dimensions, Facts, and Data modeling.
                    Need to have working knowledge of MS Azure configuration items with respect to Snowflake.
                    Developing EL pipelines in and out of data warehouse using combination of Data bricks, Python and Snow SQL.
                    Developing scripts UNIX, Python etc. to Extract, Load and Transform data, as well as other utility functions.
                    Provide production support for Data Warehouse issues such data load problems, transformation translation problems
                    Translate mapping specifications to data transformation design and development strategies and code, incorporating standards and best practices for optimal execution.
                    Understanding data pipelines and modern ways of automating data pipeline using cloud based testing and clearly document implementations, so others can easily understand the requirements, implementation, and test conditions.
                    Perform code reviews to ensure fit to requirements, optimal execution patterns and adherence to established standards.
                </p>
            </div>
            <button class="btn btn-primary p-2" type="submit">Apply</button> <span class="p-2 text-secondary"> Posted _ Days Ago</span>
        </div>
        </div>
    </div>
    );
};

export default JobListing;