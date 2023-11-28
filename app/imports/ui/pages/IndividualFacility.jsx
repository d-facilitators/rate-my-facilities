import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Carousel, Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { BookmarkHeartFill, CameraFill, ExclamationCircleFill, PencilSquare, PersonCircle, StarFill } from 'react-bootstrap-icons';
import { Facilities } from '../../api/facility/Facilities';
import LoadingSpinner from '../components/LoadingSpinner';

const IndividualFacility = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, facilityItem } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Facilities.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const facilities = Facilities.collection.find({}).fetch();
    return {
      facilityItem: facilities[0],
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container key={facilityItem._id}>
      <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
        <Row>
          <Col>
            <Carousel style={{ maxHeight: 500, width: 700 }}>
              {facilityItem.photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  { console.log(photo) }
                  <Image className="cropped" src={photo} alt={`photo_${index}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <h2>{facilityItem.facilityType} at {facilityItem.building}</h2>
                <StarFill style={{ color: '#6FB879' }} /> {facilityItem.avgRating}/5 <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
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
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default IndividualFacility;