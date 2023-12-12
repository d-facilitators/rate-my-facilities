import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
// import '/imports/startup/server/Mongo';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Facilities } from '../imports/api/facility/Facilities';

Meteor.methods({
  updateFacility: function (facilityId) {
    check(facilityId, String);
    const thisFacility = Facilities.collection.findOne(facilityId);
    if (thisFacility.statusUpdate !== 'Issue confirmed') {
      Facilities.collection.update(
        { _id: facilityId },
        { $set: { statusUpdate: 'Issue confirmed' } },
      );
    } else {
      Facilities.collection.update(
        { _id: facilityId },
        { $set: { statusUpdate: 'No issue' } },
      );
    }
  },
  userStatusWarning: function (facilityId) {
    check(facilityId, String);
    const thisFacility = Facilities.collection.findOne(facilityId);
    if (thisFacility.statusUpdate === 'No issue') {
      Facilities.collection.update(
        { _id: facilityId },
        { $set: { statusUpdate: 'Issue reported' } },
      );
    }
  },
});
