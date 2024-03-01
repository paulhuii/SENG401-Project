import React from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import "./CompanyDashboard.css"

// https://react-bootstrap.netlify.app/docs/components/tabs/#pills

const CompanyDashboard = () => {
  return (
      <div className="container-fluid company-dashboard-page">
          <div className="row mt-3 mb-3 p-2 text-center company-dash-header">
              <div className="col">
                  <h1>Company Dashboard</h1>
              </div>
          </div>

          <Tab.Container id="company-dash-menu" defaultActiveKey="company_profile">
              <Row>
                  <Col sm={2}>
                      <a href="/CompanyPost" className="btn btn-primary mb-3 company-post-btn">Post a New Job</a>

                      <Nav variant="pills" className="flex-column company-dashboard-pills">
                          <Nav.Item>
                              <Nav.Link eventKey="company_profile">Company Profile</Nav.Link>
                          </Nav.Item>

                          <Nav.Item>
                              <Nav.Link eventKey="job_listings">Job Listings</Nav.Link>
                          </Nav.Item>
                      </Nav>
                  </Col>
                  <Col sm={10}>
                      <Tab.Content>
                          <Tab.Pane eventKey="company_profile">
                              <h1>Company Profile</h1>
                          </Tab.Pane>

                          <Tab.Pane eventKey="job_listings">
                              <h1>Job Listings</h1>
                          </Tab.Pane>
                      </Tab.Content>
                  </Col>
              </Row>
          </Tab.Container>
      </div>
  )
}

export default CompanyDashboard