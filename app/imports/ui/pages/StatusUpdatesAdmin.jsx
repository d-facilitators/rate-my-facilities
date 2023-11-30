import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Facilities } from '../../api/facility/Facilities';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusesAdmin from '../components/StatusesAdmin';

/* Renders a table containing all of the Stuff documents. Use <StatusesAdmin> to render each row. */
const StatusUpdatesAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { facilityList, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Facilities.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const facilities = Facilities.collection.find({}).fetch();
    return {
      facilityList: facilities,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row style={{ paddingTop: 20 }}>
        <Col>
          <h1>Status Updates</h1>
          <p>View and update current usability status for all facilities. If a facility no longer has a standing issue, please click &quot;Resolve.&quot; To escalate an issue report into a standing issue, please click &quot;Confirm.&quot;</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Facility Type</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Status</th>
                <th>Resolve</th>
              </tr>
            </thead>
            <tbody>
              {facilityList.map((facility) => <StatusesAdmin key={facility._id} facility={facility} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StatusUpdatesAdmin;
