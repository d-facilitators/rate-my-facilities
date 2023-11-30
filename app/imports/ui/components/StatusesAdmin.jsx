import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/StatusUpdatesAdmin.jsx. */
const StatusesAdmin = ({ facility }) => (
  <tr>
    <td>{facility.facilityType}</td>
    <td>{facility.building}</td>
    <td>{facility.floor}</td>
    <td>{facility.statusUpdate}</td>
  </tr>
);

// Require a document to be passed to this component.
StatusesAdmin.propTypes = {
  facility: PropTypes.shape({
    building: PropTypes.string,
    facilityType: PropTypes.string,
    avgRating: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.string),
    statusUpdate: PropTypes.string,
    floor: PropTypes.number,
  }).isRequired,
};

export default StatusesAdmin;
