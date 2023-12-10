import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Facilities } from '../../api/facility/Facilities';

const Test = () => {
  const { ready, facilities } = useTracker(() => {
    const subscription = Meteor.subscribe(Facilities.userPublicationName);
    const isReady = subscription.ready();

    const facilityData = Facilities.collection.find({}).fetch();

    return {
      ready: isReady,
      facilities: facilityData,
    };
  }, []);

  return (
    <div>
      <h1>Facility Data</h1>
      {ready ? (
        <ul>
          {facilities.map((facility) => (
            <li key={facility._id}>
              <p>Building: {facility.building}</p>
              <p>Facility Type: {facility.facilityType}</p>
              <p>Floor: {facility.floor}</p>
              <p>Photo: {facility.photos}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading facility data...</p>
      )}
    </div>
  );
};

export default Test;
