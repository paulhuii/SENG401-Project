import "./DashboardCard.css"

function CompanyCard({ company }) {
  return (
    <div className="card-db" id='dashboard-card'>
      <div className="card-body recruiter">
        <h5 className="card-title-db">Company Name</h5>
        <p className="card-text-db">Location</p>
        <p className="card-text-db">Email:</p>
        <button type="button" className="btn btn-primary">View Jobs</button>
        <button type="button" className="btn btn-primary">Followed</button>
      </div>
    </div> 
  );
}

export default CompanyCard;
