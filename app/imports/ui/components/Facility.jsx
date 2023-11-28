import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, Carousel, Button } from 'react-bootstrap';
import { StarFill, PencilSquare, CameraFill, ExclamationCircleFill, BookmarkHeartFill, PersonCircle } from 'react-bootstrap-icons';

const Facility = ({ facility }) => {
  <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
    <Row>
      <Col>
        <Carousel style={{ maxHeight: 500, width: 700 }}>
          {facility.photos.map((photo, index) => (
            <Carousel.Item key={index}>
              <img className="cropped" src={photo} alt={`photo_${index}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col>
        <Row style={{ paddingTop: 20 }}>
          <Col>
            <h2>{facility.facilityType} at {facility.building}</h2>
            <StarFill style={{ color: '#6FB879' }} /> {facility.avgRating}/5 <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
          </Col>
        </Row>
        <Row style={{ paddingTop: 20 }}>
          <Col>
            <Button style={{ backgroundColor: '#6FB879', border: 'none' }}>
              <PencilSquare /> Write a review
            </Button>
          </Col>
          <Col>
            <Button style={{ backgroundColor: '#6FB879', border: 'none' }}>
              <CameraFill /> Upload a photo
            </Button>
          </Col>
          <Col>
            <Button style={{ backgroundColor: '#6FB879', border: 'none' }}>
              <ExclamationCircleFill /> Report an issue
            </Button>
          </Col>
          <Col>
            <Button style={{ backgroundColor: '#6FB879', border: 'none' }}>
              <BookmarkHeartFill /> Add to my favorites
            </Button>
          </Col>
        </Row>
        <hr style={{ backgroundColor: '#6FB879', height: 3, border: 'none' }} />
        <Row>
          <Col>
            <h3>Reviews</h3>
            <h6><PersonCircle style={{ color: '#6FB879' }} /> Jane Doe</h6>
            <p>&quot;I like the faucet handle, but my mouth feels dry after drinking the water.&quot;</p>
            <h6><PersonCircle style={{ color: '#6FB879' }} /> Naruto</h6>
            <p>&quot;Really convenient if you&apos;re in POST 319.&quot;</p>
            <h6><PersonCircle style={{ color: '#6FB879' }} /> Sandwich Eater</h6>
            <p>&quot;Pretty good.&quot;</p>
            <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>See all comments</a>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>;
};

Facility.propTypes = {
  facility: PropTypes.shape(
    { building: PropTypes.string,
      facilityType: PropTypes.string,
      avgRating: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.string),
      statusUpdate: PropTypes.bool,
      floor: PropTypes.number },
  ).isRequired,
};

export default Facility;
