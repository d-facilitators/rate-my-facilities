import React, { useState } from 'react';
import { Container, Row, Col, Card, ButtonGroup, Button, FormControl, Dropdown } from 'react-bootstrap';
import { StarFill, PersonCircle } from 'react-bootstrap-icons';
import SubmitReview from '../components/SubmitReview';

const FacilityRatingPage = () => {
  const allFacilityRatings = [
    { id: 1, author: 'John Doe', facilityName: 'POST Restroom', rating: 4, category: 'toilet', review: 'This restroom is so clean' },
    { id: 2, author: 'John Doe', facilityName: 'POST Lounge', rating: 3, category: 'study', review: 'Hamilton is so boring' },
    { id: 3, author: 'John Doe', facilityName: 'Paradise Palms', rating: 5, category: 'eating', review: 'Palms is so nice' },
    { id: 4, author: 'John Doe', facilityName: 'POST 2nd Floor', rating: 2, category: 'drinking', review: 'This water fountain is not clean' },
    { id: 5, author: 'James Lee', facilityName: 'Holmes Restroom', rating: 5, category: 'toilet', review: 'This restroom is so clean' },
    { id: 6, author: 'James Lee', facilityName: 'Hamilton', rating: 1, category: 'study', review: 'Hamilton is so boring' },
    { id: 7, author: 'James Lee', facilityName: 'Campus Center', rating: 2, category: 'eating', review: 'Palms is so nice' },
    { id: 8, author: 'James Lee', facilityName: 'Holmes 1st Floor', rating: 4, category: 'drinking', review: 'This water fountain is not clean' },
    { id: 9, author: 'Wyatt Matson', facilityName: 'Shidler Restroom', rating: 3, category: 'toilet', review: 'This restroom is so clean' },
    { id: 10, author: 'Wyatt Matson', facilityName: 'PACE', rating: 2, category: 'study', review: 'Hamilton is so boring' },
    { id: 11, author: 'Wyatt Matson', facilityName: 'Food Trucks', rating: 5, category: 'eating', review: 'Palms is so nice' },
    { id: 12, author: 'Wyatt Matson', facilityName: 'Water Fountain', rating: 1, category: 'drinking', review: 'This water fountain is not clean' },
    // Add more facility ratings as needed
  ];

  const [filteredFacilityRatings, setFilteredFacilityRatings] = useState(allFacilityRatings);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const getTopRating = () => {
    const sortedRatings = [...filteredFacilityRatings].sort((a, b) => b.rating - a.rating);
    return sortedRatings[0];
  };

  const getLowRating = () => {
    const sortedRatings = [...filteredFacilityRatings].sort((a, b) => a.rating - b.rating);
    return sortedRatings[0];
  };

  const topRatedFacility = getTopRating();
  const lowRatedFacility = getLowRating();

  const filterFacilities = (category) => {
    if (category === 'all') {
      setFilteredFacilityRatings(allFacilityRatings);
    } else {
      const filteredFacilities = allFacilityRatings.filter((rating) => rating.category === category);
      setFilteredFacilityRatings(filteredFacilities);
    }
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    const filteredFacilities = allFacilityRatings.filter(
      (rating) => rating.review.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredFacilityRatings(filteredFacilities);
    setSearchQuery(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    switch (option) {
    case 'top':
      setFilteredFacilityRatings([...filteredFacilityRatings].sort((a, b) => b.rating - a.rating));
      break;
    case 'critical':
      setFilteredFacilityRatings([...filteredFacilityRatings].sort((a, b) => a.rating - b.rating));
      break;
    default:
      // Reset to default sorting
      setFilteredFacilityRatings(allFacilityRatings);
      break;
    }
  };

  return (
    <Container className="mt-4" id="ratings-page">
      <h1>Facility Ratings</h1>

      {/* Search Bar */}
      <FormControl
        type="text"
        placeholder="Search by customer reviews"
        className="mb-3"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

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

      {/* Sort By Dropdown */}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Sort By: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSortChange('default')}>Default</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange('top')}>Top Reviews</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortChange('critical')}>Critical Reviews</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Total Ratings */}
      <p className="mt-2">Total Ratings: {filteredFacilityRatings.length}</p>

      {/* Top Rated and Worst Rated Facility Section */}
      <Row>
        <Col>
          <section className="mt-4">
            <h2>Top Rated Facility</h2>
            <Card>
              <Card.Body>
                <Card.Title>{topRatedFacility.facilityName}</Card.Title>
                <Card.Text>
                  <PersonCircle style={{ color: '#6FB879' }} />
                  {topRatedFacility.author}
                </Card.Text>
                <StarFill style={{ color: '#6FB879' }} /> {topRatedFacility.rating}/5 (3 reviews) <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
                <Card.Text>
                  &quot;{topRatedFacility.review}&quot;
                </Card.Text>
              </Card.Body>
            </Card>
          </section>
        </Col>
        <Col>
          <section className="mt-4">
            <h2>Worst Rated Facility</h2>
            <Card>
              <Card.Body>
                <Card.Title>{lowRatedFacility.facilityName}</Card.Title>
                <Card.Text>
                  <PersonCircle style={{ color: '#6FB879' }} />
                  {lowRatedFacility.author}
                </Card.Text>
                <StarFill style={{ color: '#6FB879' }} /> {lowRatedFacility.rating}/5 (3 reviews) <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
                <Card.Text>
                  &quot;{lowRatedFacility.review}&quot;
                </Card.Text>
              </Card.Body>
            </Card>
          </section>
        </Col>
      </Row>

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
                    <PersonCircle style={{ color: '#6FB879' }} />
                    {rating.author}
                  </Card.Text>
                  <StarFill style={{ color: '#6FB879' }} /> {rating.rating}/5 (3 reviews) <a href="http://localhost:3000/facility" style={{ color: '#6FB879' }}>Rate this facility</a>
                  <Card.Text>
                    &quot;{rating.review}&quot;
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <SubmitReview>Submit Review</SubmitReview>

    </Container>
  );
};

export default FacilityRatingPage;
