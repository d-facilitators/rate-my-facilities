import React, { useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Carousel, Col, Container, Row, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { BookmarkHeartFill, CameraFill, ExclamationCircleFill, PencilSquare, PersonCircle, StarFill } from 'react-bootstrap-icons';
import { Facilities } from '../../api/facility/Facilities';
import { Reviews } from '../../api/review/Review';
import LoadingSpinner from '../components/LoadingSpinner';

const IndividualFacility = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, facilityItem, reviews } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription1 = Meteor.subscribe(Facilities.userPublicationName);
    const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription1.ready();
    const rdy2 = subscription2.ready();
    // Get the Stuff documents
    const facility = Facilities.collection.findOne(_id);
    const facilityReviews = Reviews.collection.find({ facilityID: _id }).fetch();

    return {
      facilityItem: facility,
      reviews: facilityReviews,
      ready: rdy1 && rdy2,
    };
  }, []);

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && ready) {
      // Perform actions with the file (e.g., read the file and add it to the photos array)
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const updatedPhotos = [...facilityItem.photos, imageUrl]; // Create a new array with the added imageUrl
        Facilities.collection.update({ _id: facilityItem._id }, { $set: { photos: updatedPhotos } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (ready ? (
    <Container key={facilityItem._id}>
      <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
        <Row>
          <Col>
            <Carousel style={{ maxHeight: 500, width: 700 }}>
              {facilityItem.photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <Image className="cropped" src={photo} alt={`photo_${index}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <Row style={{ paddingTop: 20 }}>
              <h2>{facilityItem.facilityType} at {facilityItem.building}</h2>
            </Row>
            <Row style={{ paddingTop: 10 }}>
              <Col>
                <StarFill style={{ color: '#6FB879' }} /> {facilityItem.avgRating}/5 <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
              </Col>
              <Col>
                {(facilityItem.statusUpdate === 'Issue confirmed') && (
                  <div>
                    <ExclamationCircleFill style={{ color: '#FA7070' }} />
                    This facility has an active alert!
                  </div>
                )}
                {(facilityItem.statusUpdate === 'Issue reported') && (
                  <div>
                    <ExclamationCircleFill style={{ color: '#FFDF51' }} />
                    This facility has a issue pending confirmation.
                  </div>
                )}
              </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
              <Col>
                <Link to={`/addreview/${facilityItem._id}`}>
                  <Button style={{ backgroundColor: '#6FB879', border: 'none' }}>
                    <PencilSquare /> Write a review
                  </Button>
                </Link>
              </Col>
              <Col>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
                <Button style={{ backgroundColor: '#6FB879', border: 'none' }} onClick={handleButtonClick}>
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
              <Col style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <h3>Reviews</h3>
                {reviews.map((review, index) => (
                  <div key={index}>
                    <h6>
                      <PersonCircle style={{ color: '#6FB879' }} /> {review.username} - Rating: {review.rating}
                    </h6>
                    <p>&quot;{review.review}&quot;</p>
                  </div>
                ))}
                <a href="http://localhost:3000/reviews" style={{ color: '#6FB879' }}>
                  See reviews for all facilities
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default IndividualFacility;
