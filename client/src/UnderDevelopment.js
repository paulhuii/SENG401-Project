import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import "./UnderDevelopment.css"

const UnderDevelopment = () => {
    return (
        <Container fluid className="underdevelopment-container">
            <Row>
                <Col className="d-flex align-items-center justify-content-center underdevelopment-wrapper">
                    <h1 className="bg-dark-subtle rounded p-5 shadow">This page is currently underdevelopment</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default UnderDevelopment