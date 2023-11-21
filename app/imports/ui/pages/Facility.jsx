import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Carousel, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { StarFill, PencilSquare, CameraFill, ExclamationCircleFill, BookmarkHeartFill, PersonCircle } from 'react-bootstrap-icons';
import { Facilities } from '../../api/facility/Facilities';
import LoadingSpinner from '../components/LoadingSpinner';

const Facility = () => {
  const { ready, facility } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Facilities.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const facilities = Facilities.collection.find({}).fetch();
    return {
      facility: facilities,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
      <Row>
        <Col>
          <Carousel style={{ maxHeight: 500, width: 700 }}>
            <Carousel.Item>
              <img className="cropped" src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Bubbler.jpg" alt="Water fountain" />
              <Carousel.Caption>
                <p>
                  A very nice fountain!
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* eslint-disable-next-line max-len,jsx-a11y/alt-text */}
              <img className="cropped" src="https://i5.walmartimages.com/seo/Willwolf-3-Tiered-Water-Fountain-Flat-Bottom-Outdoor-LED-Lights-Modern-Garden-Porch-Patio-Resin-Waterfall_e336b59d-47dc-46a6-a624-7d0dcbe6b39b.637e93286cb6373cfc473324256549e3.jpeg" alt="Toilet" />
              <Carousel.Caption>
                <p>
                  A little confusing.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* eslint-disable-next-line max-len,jsx-a11y/alt-text */}
              <img className="cropped" src="https://today.usc.edu/wp-content/uploads/2023/09/Person-Refilling-Water-Bottle_6657-824x1236-1.jpg" alt="Toilet" />
              <Carousel.Caption>
                <p>
                  Useful when I&apos;m in a rush.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <h2>Water Fountain</h2>
              POST Building &#183; Open until 6:30pm<br />
              <StarFill style={{ color: '#6FB879' }} /> 4.2/5 (3 reviews) <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }}>
            <Col>
              <Button style={{ backgroundColor: '#6FB879', border: 'none' }}>
                <PencilSquare /> Write a comment
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
    </Container>
  ) : <LoadingSpinner />);
};

export default Facility;
