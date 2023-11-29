import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/review/Review';

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
      { sort: sortOption }
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
    <Container className="mt-4">
      <h1>Facility Reviews</h1>

      {ready ? (
        <>
          {/* Facility Type Filter Buttons */}
          <ButtonGroup className="mb-4">
            <Button
              variant={selectedFacilityType === 'all' ? 'primary' : 'secondary'}
              onClick={() => handleFacilityTypeFilter('all')}
            >
              All
            </Button>
            <Button
              variant={selectedFacilityType === 'toilet' ? 'primary' : 'secondary'}
              onClick={() => handleFacilityTypeFilter('toilet')}
            >
              Restroom
            </Button>
            <Button
              variant={selectedFacilityType === 'study' ? 'primary' : 'secondary'}
              onClick={() => handleFacilityTypeFilter('study')}
            >
              Study Area
            </Button>
            <Button
              variant={selectedFacilityType === 'eating' ? 'primary' : 'secondary'}
              onClick={() => handleFacilityTypeFilter('eating')}
            >
              Dining
            </Button>
            <Button
              variant={selectedFacilityType === 'drinking' ? 'primary' : 'secondary'}
              onClick={() => handleFacilityTypeFilter('drinking')}
            >
              Water Fountain
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

          {/* All Reviews Section */}
          <section className="mt-4">
            <h2>All Reviews</h2>
            <Row>
              {reviews.map((review) => (
                <Col key={review._id} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{review.username}</Card.Title>
                      <Card.Text>
                        Type of Facility: {review.typeOfFacility}
                      </Card.Text>
                      <Card.Text>
                        Rating: {review.rating}/5
                      </Card.Text>
                      <Card.Text>
                        Review: {review.review}
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
