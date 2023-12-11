import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Facilities } from '../../api/facility/Facilities';
import LoadingSpinner from './LoadingSpinner';

/** Renders a single row in the List Stuff (Admin) table. See pages/StatusUpdatesAdmin.jsx. */
const StatusesAdmin = ({ facility }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Facilities.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    return {
      ready: rdy,
    };
  }, []);
  const handleStatusUpdate = async () => {
    setIsUpdating(true);

    try {
      // Perform the MongoDB update operation
      await Meteor.call('updateFacility', facility._id);
      // Optional: Update the local state or trigger a re-fetch of data
    } finally {
      setIsUpdating(false);
    }
  };
  return (ready ? (
    <tr>
      <td>{facility.facilityType}</td>
      <td>{facility.building}</td>
      <td>{facility.floor}</td>
      <td>{facility.statusUpdate}</td>
      <td>
        {facility.statusUpdate === 'Issue confirmed' ? (
          <Button
            variant="success"
            onClick={handleStatusUpdate}
            disabled={isUpdating}
          >Resolve
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={handleStatusUpdate}
            disabled={isUpdating}
          >Escalate issue
          </Button>
        )}
      </td>
    </tr>
  ) : <LoadingSpinner />);
};

StatusesAdmin.propTypes = {
  facility: PropTypes.shape({
    _id: PropTypes.string,
    building: PropTypes.string,
    facilityType: PropTypes.string,
    avgRating: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
    statusUpdate: PropTypes.string,
    floor: PropTypes.number,
  }).isRequired,
};

export default StatusesAdmin;
