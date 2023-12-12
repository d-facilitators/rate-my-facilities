import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3" id="nav">
    <Container>
      <Col className="text-center">
        The Facilitators
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="https://d-facilitators.github.io/">
          Home
          Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
