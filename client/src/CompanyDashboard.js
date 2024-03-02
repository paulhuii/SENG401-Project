import React from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import "./CompanyDashboard.css"

// https://react-bootstrap.netlify.app/docs/components/tabs/#pills

const CompanyDashboard = () => {
  return (
      <div className="container-fluid">
          <div className="row mt-3 mb-1 p-2 company-dash-header">
              <div className="col d-flex align-items-center justify-content-between">
                  <h1>Company Dashboard</h1>
                  <a href="/CompanyPost" className="btn btn-primary">Post a New Job</a>
              </div>
          </div>

          <div className="row">
              <Tab.Container id="company-dash-menu" defaultActiveKey="company_profile">
                  <Row>
                      <Col lg={2} md={3}>
                          <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                  <Nav.Link eventKey="company_profile">Company Profile</Nav.Link>
                              </Nav.Item>

                              <Nav.Item>
                                  <Nav.Link eventKey="job_listings">Job Listings</Nav.Link>
                              </Nav.Item>
                          </Nav>
                      </Col>
                      <Col lg={10} md={9}>
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
      </div>
  )
}

export default CompanyDashboard