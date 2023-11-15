import React, { useState } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';

const ListFacilities = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const facilities = [
    { name: 'Bilger Hall', imagePath: '/images/bilger-hall.jpg', facilitiesList: [
      'Restrooms: 2',
      'Water filters: 1',
      'Microwaves: 1',
    ] },
    { name: 'Campus Center', imagePath: '/images/cc.jpg', facilitiesList: [
      'Restrooms: 3',
      'Water filters: 2',
      'Microwaves: 1',
    ] },
    { name: 'Hamilton Library', imagePath: '/images/hamilton-library.jpg', facilitiesList: [
      'Restrooms: 6',
      'Water filters: 5',
      'Microwaves: 0',
    ] },
    { name: 'Paradise Palms', imagePath: '/images/paradise-palms.jpg', facilitiesList: [
      'Restrooms: 3',
      'Water filters: 2',
      'Microwaves: 1',
    ] },
    { name: 'POST', imagePath: '/images/post.jpg', facilitiesList: [
      'Restrooms: 3',
      'Water filters: 2',
      'Microwaves: 1',
    ] },
    { name: 'Shidler College of Business', imagePath: '/images/shidler.jpg', facilitiesList: [
      'Restrooms: 3',
      'Water filters: 2',
      'Microwaves: 1',
    ] },
  ];

  const handleInfoClick = (facility) => {
    setShowInfo(true);
    setSelectedFacility(facility);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    setSelectedFacility(null);
  };

  return (
    <Container className={`py-3 ${showInfo ? 'blur-background' : ''}`}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>UH Manoa Facilities</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className={`g-4 ${showInfo ? 'slide-out' : ''}`}>
            {facilities.map((facility, index) => (
              <Col key={index}>
                <div className={`card ${showInfo && 'fade-out'}`}>
                  {/* Use the img tag with the path to the image */}
                  <img
                    src={facility.imagePath}
                    alt={facility.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{facility.name}</h5>

                    {/* Info button */}
                    <Button variant="success" onClick={() => handleInfoClick(facility)}>
                      Building Info
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* displaying facility information */}
      <Modal show={showInfo} onHide={handleCloseInfo} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedFacility && selectedFacility.name} Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <div>
                  <img
                    src={selectedFacility?.imagePath}
                    alt={selectedFacility?.name}
                    className="img-fluid"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                {/* Right column - Facility details */}
                <ul>
                  {selectedFacility?.facilitiesList.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListFacilities;
