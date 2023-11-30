import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PersonCircle, StarFill } from 'react-bootstrap-icons';
import { Reviews } from '../../api/review/Review';
import SubmitReview from '../components/SubmitReview';
import VisitReview from '../components/VisitReview';

const ListReviews = () => {
  const [selectedFacilityType, setSelectedFacilityType] = useState('all');
  const [sortByRating, setSortByRating] = useState(false);

  const { ready, reviews } = useTracker(() => {
    const subscription = Meteor.subscribe(Reviews.userPublicationName);
    const rdy = subscription.ready();

    let sortOption = {};
    if (sortByRating) {
      sortOption = { rating: 1 }; // Sort by rating in ascending order
    } else {
      sortOption = { rating: -1 }; // Sort by rating in descending order
    }

    const reviewItems = Reviews.collection.find(
      {
        typeOfFacility: selectedFacilityType === 'all' ? { $exists: true } : selectedFacilityType,
      },
      { sort: sortOption },
    ).fetch();

    return {
      reviews: reviewItems,
      ready: rdy,
    };
  }, [selectedFacilityType, sortByRating]);

  const handleFacilityTypeFilter = (facilityType) => {
    setSelectedFacilityType(facilityType);
  };

  const handleSortByRating = () => {
    setSortByRating(!sortByRating);
  };

  return (
    <Container className="mt-4" id="reviews-page">
      <h1>Facility Reviews</h1>

      {ready ? (
        <>
          <SubmitReview>Submit Review</SubmitReview>

          {/* All Reviews Section */}
          <section className="mt-4">
            <h5>Facility Type Filter:</h5>

            {/* Facility Type Filter Buttons */}
            <ButtonGroup className="mb-4">
              <Button
                variant={selectedFacilityType === 'all' ? 'primary' : 'secondary'}
                onClick={() => handleFacilityTypeFilter('all')}
              >
                All
              </Button>
              <Button
                variant={selectedFacilityType === 'Restroom' ? 'primary' : 'secondary'}
                onClick={() => handleFacilityTypeFilter('Restroom')}
              >
                Restroom
              </Button>
              <Button
                variant={selectedFacilityType === 'Water Fountain' ? 'primary' : 'secondary'}
                onClick={() => handleFacilityTypeFilter('Water Fountain')}
              >
                Water Fountain
              </Button>
              <Button
                variant={selectedFacilityType === 'Study Space' ? 'primary' : 'secondary'}
                onClick={() => handleFacilityTypeFilter('Study Space')}
              >
                Study Space
              </Button>
            </ButtonGroup>

            {/* Sort By Rating Dropdown */}
            <Dropdown className="mb-4">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort By Rating: {sortByRating ? 'Low to High' : 'High to Low'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleSortByRating}>Toggle Sorting</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Row>
              {reviews.map((review) => (
                <Col key={review._id} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {review.buildingName}: {review.typeOfFacility}
                      </Card.Title>
                      <Card.Text>
                        <PersonCircle style={{ color: '#6FB879' }} />
                        {review.username}
                      </Card.Text>
                      <Card.Text>
                        <StarFill style={{ color: '#6FB879' }} />
                        Rating: {review.rating}/5
                      </Card.Text>
                      <Card.Text>
                        <VisitReview />: {review.review}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </>
      ) : (
        <p>Loading reviews...</p>
      )}
    </Container>
  );
};

export default ListReviews;
