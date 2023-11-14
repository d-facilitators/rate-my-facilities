import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons';

const ListFacilities = () => {
  // Mockup data for facilities
  const facilities = [
    { name: 'Campus Center', reviews: 60, ratings: 4.5 },
    { name: 'Hamilton Library', reviews: 35, ratings: 3 },
    { name: 'POST', reviews: 13, ratings: 2.5 },
    { name: 'Paradise Palms', reviews: 5, ratings: 1.5 },
    { name: 'Random Place #1', reviews: 10, ratings: 4 },
    { name: 'Random Place #2', reviews: 20, ratings: 4 },
    // Add more facilities as needed
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={i} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key={fullStars} className="text-warning" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={fullStars + i + 1} className="text-warning" />);
    }

    return stars;
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>UH Facilities</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {facilities.map((facility, index) => (
              <Col key={index}>
                <div className="card">
                  <div className="card-body text-center">
                    <p> *IMAGE* </p>
                    <h5 className="card-title">{facility.name}</h5>
                    <p className="card-text">Overall Rating: {facility.reviews}</p>

                    {/* Star icons for ratings */}
                    <div>{renderStars(facility.ratings)}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListFacilities;
