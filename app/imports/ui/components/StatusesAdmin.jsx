import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

/** Renders a single row in the List Stuff (Admin) table. See pages/StatusUpdatesAdmin.jsx. */
const StatusesAdmin = ({ facility }) => (
  <tr>
    <td>{facility.facilityType}</td>
    <td>{facility.building}</td>
    <td>{facility.floor}</td>
    <td>{facility.statusUpdate}</td>
    <td>
      {facility.statusUpdate === 'Issue confirmed' ? (
        <Button variant="success">Resolve</Button>
      ) : (
        <Button variant="danger">Confirm</Button>
      )}
    </td>
  </tr>
);

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
