import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Carousel } from 'react-bootstrap';
import { Star } from 'react-bootstrap-icons';

const Facility = () => (
  <Container>
    <Row>
      <Col>
        <Carousel>
          <Carousel.Item>
            <img className="cropped" src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Bubbler.jpg" alt="Water fountain" style={{ maxHeight: 500, width: 'auto' }} />
            <Carousel.Caption>
              <p>
                A very nice fountain!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {/* eslint-disable-next-line max-len,jsx-a11y/alt-text */}
            <img className="cropped" src="https://i5.walmartimages.com/seo/Willwolf-3-Tiered-Water-Fountain-Flat-Bottom-Outdoor-LED-Lights-Modern-Garden-Porch-Patio-Resin-Waterfall_e336b59d-47dc-46a6-a624-7d0dcbe6b39b.637e93286cb6373cfc473324256549e3.jpeg" alt="Toilet" style={{ maxHeight: 500, width: 'auto' }} />
            <Carousel.Caption>
              <p>
                A little confusing.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>
      <Col>
        <h2>Test Facility</h2>
        POST Building &#183; Open until 6:30pm<br />
        <Star /> 4.2/5
      </Col>
    </Row>
  </Container>
);

export default Facility;
