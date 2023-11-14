import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';
import Rating from 'react-rating-stars-component';

const FacilityRatingPage = () => {
  const allFacilityRatings = [
    { id: 1, author: 'John Doe', facilityName: 'Restroom', rating: 4, category: 'toilet', review: 'This restroom is so clean' },
    { id: 2, author: 'John Doe', facilityName: 'Study Area', rating: 3, category: 'study', review: 'Hamilton is so boring' },
    { id: 3, author: 'John Doe', facilityName: 'Dining', rating: 5, category: 'eating', review: 'Palms is so nice' },
    { id: 4, author: 'John Doe', facilityName: 'Water Fountain', rating: 2, category: 'drinking', review: 'This water fountain is not clean' },
    // Add more facility ratings as needed
  ];

  const [filteredFacilityRatings, setFilteredFacilityRatings] = useState(allFacilityRatings);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getTopRating = () => {
    const sortedRatings = [...filteredFacilityRatings].sort((a, b) => b.rating - a.rating);
    return sortedRatings[0];
  };

  const topRatedFacility = getTopRating();

  const filterFacilities = (category) => {
    if (category === 'all') {
      setFilteredFacilityRatings(allFacilityRatings);
    } else {
      const filteredFacilities = allFacilityRatings.filter((rating) => rating.category === category);
      setFilteredFacilityRatings(filteredFacilities);
    }
    setSelectedCategory(category);
  };

  return (
    <Container className="mt-4">
      <h1>Facility Ratings</h1>

      {/* Filter Buttons */}
      <ButtonGroup className="mb-4">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          onClick={() => filterFacilities('all')}
        >
          All
        </Button>
        <Button
          variant={selectedCategory === 'toilet' ? 'primary' : 'secondary'}
          onClick={() => filterFacilities('toilet')}
        >
          Restroom
        </Button>
        <Button
          variant={selectedCategory === 'study' ? 'primary' : 'secondary'}
          onClick={() => filterFacilities('study')}
        >
          Study Area
        </Button>
        <Button
          variant={selectedCategory === 'eating' ? 'primary' : 'secondary'}
          onClick={() => filterFacilities('eating')}
        >
          Dining
        </Button>
        <Button
          variant={selectedCategory === 'drinking' ? 'primary' : 'secondary'}
          onClick={() => filterFacilities('drinking')}
        >
          Water Fountain
        </Button>
      </ButtonGroup>

      {/* Top Rated Facility Section */}
      <section className="mt-4">
        <h2>Top Rated Facility</h2>
        <Card>
          <Card.Body>
            <Card.Title>{topRatedFacility.facilityName}</Card.Title>
            <Card.Text>
              {topRatedFacility.author}
            </Card.Text>
            <Card.Text>
              Overall Rating: {topRatedFacility.rating}
            </Card.Text>
            <Rating value={topRatedFacility.rating} edit={false} />
            <Card.Text>
              Review: {topRatedFacility.review}
            </Card.Text>
          </Card.Body>
        </Card>
      </section>

      {/* All Facility Ratings Section */}
      <section className="mt-4">
        <h2>All Facility Ratings</h2>
        <Row>
          {filteredFacilityRatings.map((rating) => (
            <Col key={rating.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{rating.facilityName}</Card.Title>
                  <Card.Text>
                    {rating.author}
                  </Card.Text>
                  <Card.Text>
                    Overall Rating: {rating.rating}
                  </Card.Text>
                  <Rating value={rating.rating} edit={false} />
                  <Card.Text>
                    Review: {rating.review}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <Button variant="primary" className="mt-4">
        Submit Facility Rating
      </Button>
    </Container>
  );
};

export default FacilityRatingPage;
