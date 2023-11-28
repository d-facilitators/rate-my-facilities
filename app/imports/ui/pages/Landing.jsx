import React, { useState } from 'react';
import { Col, Container, Image, Row, Form, InputGroup } from 'react-bootstrap';
import { FileEarmarkTextFill, PencilSquare, GeoAltFill, BuildingsFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const [buildingName, setBuildingName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to another page with building name as a query parameter
    navigate(`/facilities?name=${buildingName}`);
  };

  return (
    <Container id="landing-page" fluid className="py-5 h-100">
      <Row className="align-middle text-center justify-content-center m-3">
        <Col xs={8}>
          <Image src="/images/rate-my-logo.png" width="500px" />
        </Col>
      </Row>
      <Row className="align-middle text-center justify-content-center p-3">
        <Col xs={8}>
          <h3>Enter your building to get started</h3>
        </Col>
      </Row>
      <Row className="align-middle text-center justify-content-center mt-3">
        <Col xs={8} className="d-flex justify-content-center align-items-center">
          <Form id="buildingForm" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1"><BuildingsFill /></InputGroup.Text>
              <Form.Control value={buildingName} onChange={(e) => setBuildingName(e.target.value)} placeholder="Your Building" id="building-search" />
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="align-middle text-center justify-content-center mt-5">
        <h3 className="mb-5">Join the RMF Family</h3>
        <Col xs={8} sm={3}>
          <PencilSquare size={50} className="py-2" />
          <h4>Manage and edit your ratings</h4>
        </Col>
        <Col xs={8} sm={3}>
          <GeoAltFill size={50} className="py-2" />
          <h4>Find the nearest facility to you based on ranking</h4>
        </Col>
        <Col xs={8} sm={3}>
          <FileEarmarkTextFill size={50} className="py-2" />
          <h4>Get instant updates on problems with facilities on campus</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
