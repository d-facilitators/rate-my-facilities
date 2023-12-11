import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Facilities } from '../../api/facility/Facilities';
import LoadingSpinner from '../components/LoadingSpinner';

const ListFacilities = () => {
  const location = useLocation();
  const [showInfo, setShowInfo] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const buildings = [
    { name: 'Bilger Hall', imagePath: '/images/bilger-hall.jpg', facilitiesList: {} },
    { name: 'Campus Center', imagePath: '/images/cc.jpg', facilitiesList: {} },
    { name: 'Hamilton Library', imagePath: '/images/hamilton-library.jpg', facilitiesList: {} },
    { name: 'Paradise Palms', imagePath: '/images/paradise-palms.jpg', facilitiesList: {} },
    { name: 'POST', imagePath: '/images/post.jpg', facilitiesList: {} },
    { name: 'Shidler College of Business', imagePath: '/images/shidler.jpg', facilitiesList: {} },
  ];

  const { ready, facilities } = useTracker(() => {
    const subscription = Meteor.subscribe(Facilities.userPublicationName);
    const rdy = subscription.ready();

    const facilityItems = Facilities.collection.find().fetch();

    // Group facilities by building and type
    const groupedFacilities = {};
    facilityItems.forEach(facility => {
      const { building, facilityType } = facility;
      if (!groupedFacilities[building]) {
        groupedFacilities[building] = {
          Restroom: [],
          'Water fountain': [],
          'Study space': [],
        };
      }
      if (!Array.isArray(groupedFacilities[building][facilityType])) {
        groupedFacilities[building][facilityType] = [];
      }
      groupedFacilities[building][facilityType].push(facility);
    });

    // Prepare buildings with facilitiesList
    const buildingsWithFacilities = buildings.map(building => ({
      ...building,
      facilitiesList: groupedFacilities[building.name] || {},
    }));

    return {
      facilities: buildingsWithFacilities,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready) {
      // Parse the query parameter from the URL
      const queryParams = new URLSearchParams(location.search);
      const buildingName = queryParams.get('name');

      // Search for facility name in database
      const found = facilities.find((building) => building.name === buildingName);

      // Show the popup if building name was found
      if (found) {
        setSelectedBuilding(found);
        setShowInfo(true);
      } else if (!found && buildingName) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    }
  }, [location.search, ready]);

  const handleInfoClick = (building) => {
    setShowInfo(true);
    setSelectedBuilding(building);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
    setSelectedBuilding(null);
  };

  return (ready ? (
    <Container id="buildings-page" className={`py-3 ${showInfo ? 'blur-background' : ''}`}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>UH Manoa Buildings</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className={`g-4 ${showInfo ? 'slide-out' : ''}`}>
            {facilities.map((building, index) => (
              <Col key={index}>
                <div className={`card ${showInfo && 'fade-out'}`}>
                  {/* Use the img tag with the path to the image */}
                  <img
                    src={building.imagePath}
                    alt={building.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{building.name}</h5>

                    {/* Info button */}
                    <Button variant="success" onClick={() => handleInfoClick(building)}>
                      Building Info
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* displaying building information */}
      <Modal show={showInfo} onHide={handleCloseInfo} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedBuilding && selectedBuilding.name} Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={6}>
                <div>
                  <img
                    src={selectedBuilding?.imagePath}
                    alt={selectedBuilding?.name}
                    className="img-fluid"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                {/* Right column - Facility details */}
                <ul>
                  {selectedBuilding && Object.entries(selectedBuilding.facilitiesList).map(([type, facilitiesList]) => (
                    <React.Fragment key={type}>
                      <h3>{type}</h3>
                      <ul>
                        {facilitiesList.sort((a, b) => b.avgRating - a.avgRating).map((facility, index) => (
                          <li key={index}>
                            <Link to={`/facility/${facility._id}`}>
                              Floor {facility.floor} - Rating: {facility.avgRating}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
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

      {/* Pop up if building not found */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Building not found!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please check the building name and try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  ) : <LoadingSpinner />);
};

export default ListFacilities;
