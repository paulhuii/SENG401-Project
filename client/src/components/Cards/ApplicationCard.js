import "./DashboardCard.css"

function ApplicationCard({ application }) {
  return (
    <div className="card-db" id='dashboard-card'>
        <div className="card-body applied-job">
            <h5 className="card-title-db">Job Title</h5>
            <p className="card-text-db">Company Name</p>
            <p className="card-text-db">Location</p>
            <p className="card-text-db">Date Applied: 2021-01-01</p>
            <button type="button" className="btn btn-primary">View Application</button>
        </div>
    </div>
  );
}

export default ApplicationCard;