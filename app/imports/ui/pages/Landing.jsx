import React from 'react';
import { Col, Container, Image, Row, Form } from 'react-bootstrap';
import { FileEarmarkTextFill, PencilSquare, GeoFill } from 'react-bootstrap-icons';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center justify-content-center m-3">
      <Col xs={8}>
        <Image src="/images/rate-my-logo.png" width="400x" />
      </Col>
    </Row>
    <Row className="align-middle text-center justify-content-center p-3">
      <Col xs={8}>
        <h3>Enter your building to get started</h3>
      </Col>
    </Row>
    <Row className="align-middle text-center justify-content-center mt-3">
      <Col xs={8} className="d-flex justify-content-center align-items-center">
        <Form id="buildingForm">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Your Building" />
          </Form.Group>
        </Form>
      </Col>
    </Row>
    <Row className="align-middle text-center justify-content-center mt-5">
      <h3 className="mb-5">Join the RMF Family</h3>
      <Col xs={3}>
        <PencilSquare size={50} className="py-2" />
        <h4>Manage and edit your ratings</h4>
      </Col>
      <Col xs={3}>
        <GeoFill size={50} className="py-2" />
        <h4>Find the nearest facility to you based on ranking</h4>
      </Col>
      <Col xs={3}>
        <FileEarmarkTextFill size={50} className="py-2" />
        <h4>Get instant updates on problems with facilities on campus</h4>
      </Col>
    </Row>
  </Container>
);

export default Landing;
